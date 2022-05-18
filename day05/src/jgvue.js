/*
 * @Author: LuLu
 * @Date: 2022-05-18 22:22:40
 * @LastEditors: LuLu
 * @LastEditTime: 2022-05-18 22:22:41
 * @Description: 
 * FindMe:https://github.com/lululutx
 */
function JGVue(options) {
    this._data = options.data;
    let elm = document.querySelector(options.el); // vue 是字符串, 这里是 DOM 
    this._template = elm;
    this._parent = elm.parentNode;

    this.initData(); // 将 data 进行响应式转换, 进行代理

    this.mount(); // 挂载
}   