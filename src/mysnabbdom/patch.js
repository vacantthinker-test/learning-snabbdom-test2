/**
 * 简单版patch()
 *
 * 比较两个节点, 替换成新的.
 * @param oldVnode 旧虚拟节点, 第一次patch时, 旧节点为DOM节点需要转换
 * @param newVnode
 */
import {vnode} from "./vnode";
import {patchVnode} from "./patchVnode";
import {createElement} from "./createElement";

export function patch(oldVnode, newVnode) {
    // 一：oldVnode是虚拟节点么? 不是, 那么转换一下.
    if (isVnode(oldVnode) === false){
        oldVnode = convertDomToVnode(oldVnode)
    }
    // console.log(oldVnode)
    // 二：新旧都是虚拟节点了, 比较一下
    if (sameVnode(oldVnode, newVnode)){
        // 新旧key和selector都一样
        patchVnode(oldVnode, newVnode);
    }else {
        // 新旧key和selector不一样
        // 一：创建新元素
        // 二：插入新元素
        // 三：删除旧元素
        // 当前old为div#box, new为span
        let elm = oldVnode.elm;
        let refChild = elm // div#box
        let newChild = createElement(newVnode) // span 'i am a text'
        // patch(box, vnode1)
        // box和vnode1为同一级别, 在box前面插入span
        let parentElement = elm.parentElement; // 这里为body元素
        parentElement.insertBefore(newChild, refChild)
        elm.remove()
    }
}

/**
 * 如果两个虚拟节点的key和selector都一样, 返回true. 否则false
 * @param vnode1
 * @param vnode2
 * @returns {boolean}
 */
export function sameVnode(vnode1, vnode2) {
    let sameKey = vnode1.key === vnode2.key;
    let sameSelector = vnode1.selector === vnode2.selector;

    return sameKey && sameSelector
}

/**
 * 是虚拟节点么? 有selector属性, 那么就是虚拟节点. 否则就不是.
 * @param node
 * @returns {{data, children, elm, selector, text, key: *}}
 */
function isVnode(node) {
    return node.selector !== undefined
}

/**
 * 转换DOM节点为虚拟节点
 * @param node
 * @returns {{data, children, elm, selector, text, key: *}}
 */
function convertDomToVnode(node) {
    return vnode(node.tagName.toLowerCase(), {}, node.innerText, undefined, node)
}




















