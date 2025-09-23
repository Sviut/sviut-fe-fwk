import {h} from "sviut-fe-fwk/src/h";

const vDom = h('form', {action: 'login'}, [
    h('input', {type: 'text', name: 'user'}),
    h('input', {type: 'password', name: 'password'}),
    h('button', {on: {click: 'login'}}, ['Login'])
])
