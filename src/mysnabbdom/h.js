/**
 * 简单版h 函数
 * 情况一：h('div', {}, 'text') 文本
 * 情况二：h('div', {}, []) 数组
 * 情况三：h('div', {}, h()) 单个h()
 *
 * @param sel 选择器. eg: ul, li, div, section, ...
 * @param data 数据 class, props
 * @param c 可能是 'text', [], h()
 */
import {vnode} from "./vnode";

/**
 *
 * @param sel
 * @param data
 * @param c
 * @returns {{data, children, elm, selector, text, key: *}}
 */
export function h(sel, data, c) {
    let text = undefined;
    let children = undefined;
    let elm = undefined;
    if (arguments.length !== 3){
        throw new Error('请输入3个参数')
    }
    if (typeof c === 'string'){ // typeof c, c的类型 === string. 那就是text
        text = c
    }else if (Array.isArray(c) && c.length > 0){ // 数组
        children = c
    }else if (c && c.selector !== undefined){ // c非空, c有selector
        children = [c]
    }else {
        throw new Error('请输入正确的参数')
    }
    return vnode(sel, data, text, children, elm)
}















