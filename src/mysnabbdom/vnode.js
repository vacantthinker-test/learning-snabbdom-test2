/**
 * snabbdom virtual dom
 * 虚拟DOM
 * vnode, 创建一个虚拟节点
 * @param selector 选择器, eg: div, ul, li, p, section...
 * @param data '{}', class类样式, props{href, title, ...}
 * @param text 文本
 * @param children eg: ul里面的li, li, li ...
 * @param elm 虚拟节点对应DOM中的元素
 * @returns {{data, children, elm, selector, text, key: *}}
 */
export function vnode(selector, data, text, children, elm) {
    let key = data !== undefined ? data.key : undefined;
    return {selector, data, text, children, elm, key}
}