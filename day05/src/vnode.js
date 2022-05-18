/*
 * @Author: LuLu
 * @Date: 2022-05-18 22:22:55
 * @LastEditors: LuLu
 * @LastEditTime: 2022-05-18 22:22:56
 * @Description: 
 * FindMe:https://github.com/lululutx
 */
class VNode {
    constructor(tag, data, value, type) {
        this.tag = tag && tag.toLowerCase();
        this.data = data;
        this.value = value;
        this.type = type;
        this.children = [];
    }

    appendChild(vnode) {
        this.children.push(vnode);
    }
}