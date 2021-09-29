import {h, patch} from "./mysnabbdom";

let box = document.getElementById('box')
let vnode1 = h('ul', {}, [
    h('li', {key: 'D'}, 'D'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'Q'}, 'Q'),
])
// console.log('vnode1',vnode1)
// 虚拟节点有了, 下一步 patch
patch(box, vnode1)

let vnode2 = h('ul', {}, [
    h('li', {key: 'M'}, 'M'),
    h('li', {key: 'A'}, 'A'),
    h('li', {key: 'B'}, 'B'),
    h('li', {key: 'N'}, 'N'),
    h('li', {key: 'O'}, 'O'),
    h('li', {key: 'C'}, 'C'),
    h('li', {key: 'E'}, 'E'),
])

// 延时执行 300ms毫秒
setTimeout(() => {
    patch(vnode1, vnode2)
}, 300)