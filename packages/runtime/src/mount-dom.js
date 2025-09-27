import {DOM_TYPES} from "./h";
import {setAttributes} from "./attributes";
import {addEventListeners} from "./events";


export function mountDom(vDom, parentEl) {
    switch (vDom.type) {
        case DOM_TYPES.TEXT: {
            createTextNode(vDom, parentEl);
            break
        }
        case DOM_TYPES.ELEMENT: {
            createElementNode(vDom, parentEl);
            break;
        }
        case DOM_TYPES.FRAGMENT: {
            createFragmentNodes(vDom, parentEl);
            break
        }

        default: {
            throw new Error(`Unexpected type ${vDom.type}`);
        }
    }
}


function createTextNode(vDom, parentEl) {
    const {value} = vDom

    const textNode = document.createTextNode(value)
    vDom.el = textNode

    parentEl.append(textNode)
}

function createElementNode(vDom, parentEl) {
    const {tag, props, children} = vDom

    const element = document.createElement(tag)
    addProps(element, props, vDom)
    vDom.el = element

    children.forEach(child => mountDom(child, element))
    parentEl.append(element)
}

function addProps(el, props, vdom) {
    const {on: events, ...attrs} = props
    vdom.listeners = addEventListeners(events, el)
    setAttributes(el, attrs)
}

function createFragmentNodes(vdom, parentEl) {
    const {children} = vdom
    vdom.el = parentEl

    children.forEach((child) => mountDom(child, parentEl))
}
