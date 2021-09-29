/**
 * 新旧有相同的key和selector, 都有children
 * @param elm
 * @param oldCh
 * @param newCh
 */
import {sameVnode} from "./patch";
import {patchVnode} from "./patchVnode";
import {createElement} from "./createElement";

export function updateChildren(elm, oldCh, newCh) {

    // 四个指针
    // 四个指针对应的虚拟节点
    // 四种命中查找, 非四命中,
    // while循环, if
    let oldStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let newStartIdx = 0
    let newEndIdx = newCh.length - 1

    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldCh.length - 1]
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newCh.length - 1]
    // 四命中
    // 一：新前与旧前 二：新后与旧后 三：新后与旧前 四：新前与旧后

    let oldMap
    let positionInMap

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        // while循环最少执行 length数组长度短的次数
        // oldVnode和newVnode可以看作两个数组
        // 开始四命中查找
        if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx]
        } else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        } else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        } else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            // 如果一样, 那么patchVnode
            patchVnode(oldStartVnode, newStartVnode) // 比较虚拟节点, 更新节点
            // 指针移动, 虚拟节点更新
            // 当前示例：情况一：新前与旧前
            // oldCh --> A B C
            // newCh --> A B C D
            // 把oldCh和newCh看作两张横着的数组,
            //      每一个子项, 看作一个map
            //      map.key 就是selector和key
            //      map.value 就是 text或者children
            // A B C 依次走完, while 会false. if会处理剩下的
            oldStartVnode = oldCh[++oldStartIdx] // 指针向右[向后] 移动
            newStartVnode = newCh[++newStartIdx]
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // 新后与旧后
            // 如果一样，那么patchVnode
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            // 新后与旧前
            patchVnode(oldStartVnode, newEndVnode)
            // old A B C
            //     0 1 2
            // new C B A
            //     0 1 2
            // 四命中匹配新后与旧前
            // 需要移动元素A至队尾元素的下一个兄弟元素位置

            let refChild = oldCh[oldEndIdx].elm.nextSibling
            let newChild = oldCh[oldStartIdx].elm
            elm.insertBefore(newChild, refChild)

            oldStartVnode = oldCh[++oldStartIdx] // 更新指针, 更新虚拟节点
            newEndVnode = newCh[--newEndIdx]
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            patchVnode(oldEndVnode, newStartVnode)
            // old D C B A
            //     0 1 2 3
            // new A B C
            //     0 1 2
            // new 前A元素 匹配 old 后A元素
            //      移动A元素

            let refChild = oldCh[oldStartIdx].elm
            let newChild = oldCh[oldEndIdx].elm
            elm.insertBefore(newChild, refChild)

            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            // 非四命中
            // 一：新前与旧前 二：新后与旧后 三：新后与旧前 四：新前与旧后 都没有匹配上

            // 第一步：创建oldCh的key与idx 的map
            if (oldMap === undefined) {
                oldMap = createOldMap(oldCh)
            }
            // 第二步：查找new key 在不在old-map中, 从newStartVnode.key 开始找

            // 第三步：如果找到了，patchVnode, 移动节点。 并把该节点 --> undefined，表示处理过了
            //          没有找到，创建新元素，追加新元素至old DOM
            positionInMap = oldMap[newStartVnode.key];
            if (positionInMap === undefined) {
                // old D C B A
                // new M N O

                // 没找到M, 在旧 子项最前面插入M
                let refChild = oldCh[oldStartIdx].elm
                let newChild = createElement(newStartVnode)
                elm.insertBefore(newChild, refChild)
            } else {


                // 找到了, 需要移动该元素
                // old D C A Q
                //     0 1 2 3
                // new M A B N O
                //     0 1 2 3 4

                // old  M D C A Q
                // new  M A B N O
                // console.log('say hi')

                let refChild = oldCh[oldStartIdx].elm
                let newChild = oldCh[positionInMap].elm
                elm.insertBefore(newChild, refChild)
                oldCh[positionInMap] = undefined

            }


            newStartVnode = newCh[++newStartIdx]
        }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        // while没处理完的, if来处理剩下的
        // old有3个，new有5个, while至少执行3次,
        //      假设while执行3次, while处理了3个. 当前if来处理剩下的2个

        // 当前示例：
        // old A B C
        //     0 1 2
        // new A B C D
        //     0 1 2 3
        // while处理了3个, 每次都是新前与旧前命中. 现在剩一个. 当前if来处理
        if (oldStartIdx > oldEndIdx) {
            // 3 > 2
            // newCh长度大于oldCh长度, 需要追加新元素至old DOM
            //
            // old A B C
            //     0 1 2
            // new A B C D
            //     0 1 2 3
            // 现在 oldStartIdx -> 3, 这意味着 refChild -> null

            // old A B C
            //     0 1 2
            // new D A B C
            //     0 1 2 3
            // 四命中匹配二：新后与旧后, 变化的是endIdx 和 endVnode
            // 现在 oldStartIdx -> 0, 那么 refChild -> A
            let refChild = oldCh[oldStartIdx].elm
            addVnodesInsert(elm, newCh,
                newStartIdx, newEndIdx, refChild)
        } else {
            // 如果 是 <
            // 那么 newCh长度小于oldCh长度, 需要删除旧元素从old DOM
            // old A B C
            //     0 1 2
            // new A B
            //     0 1
            // 四命中查找：一：新前与旧前
            removeVnode(oldCh, oldStartIdx, oldEndIdx)
        }

    }
}

export function createOldMap(children) {
    let map = {}
    for (let i = 0; i < children.length; i++) {
        let item = children[i]
        if (item) {
            let key = item.key
            map[key] = i
        }
    }
    return map
}

export function removeVnode(children, startIdx, endIdx) {
    for (; startIdx <= endIdx; startIdx++) {
        let item = children[startIdx]
        if (item !== undefined) {
            item.elm.remove()
        }
    }
}

export function addVnodesInsert(elm, children, startIdx, endIdx, refChild) {
    for (; startIdx <= endIdx; startIdx++) {
        let item = children[startIdx]
        let newChild = createElement(item)
        // insertBefore 有个特点
        //      refChild为null, 就在父元素的子项末尾追加 --> appendChild
        //      refChild不为null, 就在refChild前面加上newChild
        elm.insertBefore(newChild, refChild)
    }
}

































