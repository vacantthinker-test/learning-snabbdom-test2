```
/**
 *
 * // 示例：
 // old D C A Q
 //     0 1 2 3
 // new M A B N O
 //     0 1 2 3 4
 //
 * old-map {D : 0, C : 1, A : 2, Q : 3}
 *
 * // while ( 0<= 3 && 0 <= 4)true 非四命中
 //      old-map === undefined?
 //          创建old-map,
 *
 //      M在old-map中么?
 //          不在, 创建M元素, 在D元素之前插入
 //          newStartVnode = newCh[++newStartIdx]
 //          new M -> A 0 -> 1
 //          old M D C A Q
 *
 * -----------------------------------------------------
 * while (0 <= 3 && 1 <= 4)true 非四命中
 *      A 在old-map中么？
 *          在
 *              pathchVnode -> 比较旧A元素和新A元素, 然后更新
 *              移动A元素
 *              A元素在 D元素(旧前) 插入
 *                  oldCh = [D , C , A , Q] 旧前元素

 *              old M A D C Q
 *              newStartVnode = newCh[++newStartIdx]
 *              new A -> B, 1 -> 2
 *              A元素 = undefined, 表示A元素处理过了
 *
 * ----------------------------------------------------------
 * while (0<=3 && 2 <=4) true 非四命中
 *      B 在old-map中么
 *          不在
 *              创建B元素, 在D元素(旧前)插入
 *                  oldCh = [D , C , undefined , Q] 旧前D元素

 *              old M A B D C Q
 *              new B -> N, 2 -> 3
 *              newStartVnode = newCh[++newStartIdx]
 *
 * ----------------------------------------------------------
 * while (0<=3 && 3 <= 4) true 非四命中
 *      N 在 old-map中么
 *          不在
 *              创建N元素, 在D元素(旧前)插入
 *                  oldCh = [D , C , undefined , Q] 旧前D元素

 *              old M A B N D C Q
 *              new N -> 0, 3 -> 4
 *              newStartVnode = newCh[++newStartIdx]
 *
 * ---------------------------------------------------------
 * while (0<=3 && 4 <= 4) true 非四命中
 *      O 在old-map中么?
 *          不在
 *              创建O元素, 在D元素(旧前)插入
 *                  oldCh = [D , C , undefined , Q] 旧前D元素
 *
 *              old M A B N O D C Q
 *              new 0 -> null, 4 -> 5
 *              newStartVnode = newCh[++newStartIdx]
 *
 * -------------------------------------------------------------
 * while (0<=3&& 5 <=4) false
 * while 是两两对比, if来处理剩余的
 *
 *      oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx
 * if ( 0< = 3 || 5 <= 4)
 *      oldStartIdx > oldEndIdx
 *      if ( 0 > 3){
 *
 *      }else {
 *              old M A B N O D C Q
 *              // 上面这个数组对应的是DOM children数组
 *
 *              这里呢, old有两个数组, 初始oldCh D C A Q
 *              旧children里匹配一个 新children 中的 A元素
 *              A元素 = undefined
 *              那么现在就是 oldCh = [D , C , undefined , Q]
 *          // 处理多余的,
 *          // 移除  D C Q
 *          // remove
 *          let startIdx = 0 // 开头是D
 *          let endIdx = 3 // 结尾是Q
 *          let children = oldCh
 *          for(;startIdx <= endIdx; startIdx++){
 *              let item = children[i]
 *              if(item !== undefined){
 *                  item.elm.remove()
 *              }
 *          }
 *
 *              old M A B N O D C Q
 *
 *              old M A B N O
 *              完工!
 *      }
 */




















```