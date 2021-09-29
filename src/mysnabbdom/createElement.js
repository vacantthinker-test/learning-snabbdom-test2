/**
 * 简单版本
 * text和children互斥, 即同时只能存在一个
 * 根据给定的vnode 虚拟节点, 创建DOM节点
 * @param vnode
 */
export function createElement(vnode) {
    let text = vnode.text
    let children = vnode.children
    let domNode = document.createElement(vnode.selector);

    if (text) { // 存在text
        domNode.innerText = text
    } else if (children && children.length > 0) { // 存在children
        // ul li, li, li ...
        for (let i = 0; i < children.length; i++) {
            let item = children[i];
            let itemChild = createElement(item) // 创建li
            domNode.appendChild(itemChild) // 追加li到ul
        }
    }

    // 绑定创建好的DOM 节点至 虚拟节点
    vnode.elm = domNode
    return domNode
}






















