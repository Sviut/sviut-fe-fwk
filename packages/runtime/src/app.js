import {destroyDom} from './destroy-dom'
import {Dispatcher} from './dispatcher'
import {mountDom} from './mount-dom'
import {pathDOM} from './path-dom'

export function createApp({state, view, reducers = {}}) {
    let parentEl = null
    let vdom = null

    const dispatcher = new Dispatcher()
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)]

    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload)
    }

    for (const actionName in reducers) {
        const reducer = reducers[actionName]

        const subs = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload)
        })
        subscriptions.push(subs)
    }

    function renderApp() {
        const newVdom = view(state, emit)
        vdom = pathDOM(vdom, newVdom, parentEl)
    }

    return {
        mount(_parentEl) {
            parentEl = _parentEl
            vdom = view(state, emit)
            mountDom(vdom, parentEl)
            return this
        },

        unmount() {
            if (vdom) destroyDom(vdom)
            vdom = null
            subscriptions.forEach(unsub => unsub())
        },

        emit(eventName, payload) {
            emit(eventName, payload)
        },
    }
}
