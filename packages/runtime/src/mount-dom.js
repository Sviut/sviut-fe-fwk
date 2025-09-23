import {DOM_TYPES} from "./h";


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
// TODO
}

function createFragmentNodes(vDom, parentEl) {
// TODO
}
