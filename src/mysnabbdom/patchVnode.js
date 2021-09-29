import {updateChildren} from "./updateChildren";
import {createElement} from "./createElement";
/**
 * 简单版本, text和children互斥.
 * 新旧key和selector都一样,
 *      那么就需要进行text和children的对比
 * @param oldVnode 老虚拟节点在左边
 * @param newVnode 新虚拟节点在右边
 * 参数顺序重要
 */
export function patchVnode(oldVnode, newVnode) {
    let elm = newVnode.elm = oldVnode.elm;
    let newText = newVnode.text;
    let oldText = oldVnode.text;
    let newCh = newVnode.children
    let oldCh = oldVnode.children

    if (isDefined(newText)){
        // 新有text 无children
        // 如果旧text和新text一摸一样, 那么什么都不做
        //      如果不一样, 清空旧text, 更新为新text
        if (newText !== oldText) {
            elm.textContent = ''
            elm.innerText = newText
        }
    }else if (isDefined(newCh) && newCh.length > 0){
        // 新无text 有children
        // 情况一：旧 无text 有children
        // 情况二：旧 有text 无children
        if (isDefined(oldCh) && oldCh.length > 0){
            // 新旧都有children
            updateChildren(elm, oldCh, newCh)
        }else{
            // 步骤一：清空旧text
            // 步骤二：创建数组中的每一项新元素, 追加新元素
            elm.textContent = ''
            addVnodesAppend(elm, newCh)
        }
    }
}

export function addVnodesAppend(elm, children){
    for (let i = 0; i < children.length; i++) {
        let item = children[i]
        let itemElm = createElement(item)
        elm.appendChild(itemElm)
    }
}

export function isDefined(s) {
    return s!== undefined
}
export function isUndefined(s) {
    return s === undefined
}



















