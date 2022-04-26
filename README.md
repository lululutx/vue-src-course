<!--
 * @Author: LuLu
 * @Date: 2022-03-29 21:09:28
 * @LastEditors: LuLu
 * @LastEditTime: 2022-04-26 21:11:26
 * @FilePath: \vue-src-course\README.md
 * @Description:
 * https://github.com/lululutx
 * Copyright (c) 2022 by LuLu, All Rights Reserved.
-->

数据驱动

前提： 1.你一定用过 vue 2.如果没有用过，可以去官网看看

# Vue 与模板

使用步骤:

    1.编写 页面 模板
        1.直接写 HTML标签
        2.使用template
        3.使用 单文件 （<template />）
    2.创建Vue实例
        1.在Vue 的构造函数中，提供 data，methods，computed，watcher，props，。。。
    3.将Vue挂载到页面中（mount）

# 数据驱动模型

Vue 的执行流程 1.获得模板：模板中有“坑” 2.利用 Vue 构造函数提供的数据来“填坑”，得到可以在页面中显示的标签了。 3.替换页面中有"坑"的位置

Vue 利用我们提供的数据 和页面中的模板 生成了一个新的 Html 标签 (node 元素),替换掉页面中放置模板的位置.

# 简单的模板实现

# 虚拟 DOM

目标: 1.怎么将真正的 DOM 转化为虚拟 DOM 2.这么把虚拟 DOM 转化为真正的 DOM

思路与深拷贝类似

# 函数柯里化

参考资料:

- [前端基础漫游指南](https://cheogo.github.io/learn-javascript/)
- [函数式编程](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)
- [维基百科-柯里化](https://zh.wikipedia.org/wiki/%E6%9F%AF%E9%87%8C%E5%8C%96)

涉及概念:

1.柯里化:一个函数,原本有多个参数,只传入**一个**参数,生成一个新函数,由新函数接收剩下的参数来运行得到结构 2.偏函数:一个函数,原本有多个参数,只传入**一部分**参数,生成一个新函数,由新函数接收剩下的参数来运行得到结构 3.高阶函数:一个函数,他的参数是一个函数,该函数对参数这个函数进行加工,得到一个函数,这个加工用的函数就是高阶函数

为什么要使用柯里化?为了提升性能.我们使用柯里化可以缓存一部分能力.

使用两个例子进行说明: 1.判断元素 2.虚拟 DOM 的 render 方法
附:

```javascript
// 正常正则验证字符串 reg.test(txt)

// 函数封装后
function check(reg, txt) {
  return reg.test(txt);
}

check(/\d+/g, "test"); //false
check(/[a-z]+/g, "test"); //true

// Currying后
function curryingCheck(reg) {
  return function (txt) {
    return reg.test(txt);
  };
}

var hasNumber = curryingCheck(/\d+/g);
var hasLetter = curryingCheck(/[a-z]+/g);

hasNumber("test1"); // true
hasNumber("testtest"); // false
hasLetter("21212"); // false
```

1.判断元素
Vue 的本质是使用 HTML 的字符串为模板的,将字符串的米板转换为 AST(抽象语法树),再转换为 VNode

- 模板 -> AST
- AST -> VNode
- VNode -> DOM

哪个阶段最消耗性能?
最消耗性能的是字符串解析 (模板 -> AST)
例子: let s = "1 + 2 _ ( 3 + 4 _ ( 5 + 6) )"
写一个程序,解析这个表达式,得到结果(一般化)
我们一般会将这个表达式转换为"波兰式"表达式,然后用栈结构来运算

在 Vue 中,每一个标签可以是真正的 HTML 标签,也可以是自定义组件,问怎么区分
在 Vue 的源码中,其实将所有可用的 HTML 标签已经存起来了,遍历

假设这里只考虑几个标签

```js
let tags = "div,p,a,img,ul,li".split(",");
```

我需要一个函数,来判断一个标签名,判断一个标签是否为内置的标签

```js
function isHTMLTag(tagName) {
  tagName = tagName.toLowerCase();
  for (let i = 0; i < tags.length; i++) {
    if (tagName === tags[i]) return true;
  }
  return false;
}
```

模板是任意编写的,可以写的很简答,也可以写的很复杂,indexOf 内部也是要循环的
如果有 6 种内置标签,而模板中 有 10 个 标签需要判断 ,那么就需要执行 60 次循环

2.虚拟 DOM 的 render 方法
思考:Vue 模板转换为抽象语法树,需要执行几次

- 页面一开始加载需要渲染
- 每一个属性(响应式) 数据在发生变化的时候要渲染
- watch computed 等等

我们原先写的代码 ,每次需要渲染的时候,模板就会被解析一次(我们简化了解析方法) [07-deepProps.html]

render 的作用是将虚拟 DOM 转换为真正的 DOM 加到页面中

- 虚拟 DOM 可以降级理解为 AST
- 一个项目运行的时候 模板是不会变的 这就表示 AST 是不会变的

我们可以将代码进行优化,将虚拟 DOM 缓存起来,生成一个函数,函数只需要传入数据,就可以得到真正的 DOM

# 响应式原理

## 讨论

- 这样闭包会内存泄露吗
  - 性能一定会是有问题的
  - 尽可能的提高性能

# 问题

# 响应式原理

- 我们在使用 Vue 的时候,赋值属性获得属性都是直接使用的 Vue 实例
- 我们在设置属性值的时候,页面的数据更新

```js
Object.defineProperty(对象, "设置什么属性名", {
  writeable,
  configable,
  enumerable, //用来控制属性是否可枚举,是不是可以被for-in循环取出来
  set() {}, //赋值触发
  get() {}, //取值触发
});
```

```js
/**
 * @description: 这个函数这个闭包来缓存数据 简化后的版本
 * @param {*} target
 * @param {*} key
 * @param {*} value
 * @param {*} enumerable 可枚举的
 * @return {*}
 */
function defineReactive(target, key, value, enumerable) {
  //函数内部就是一个局部作用域,这个value就只是在函数内部使用的变量(闭包 )
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: !!enumerable,
    get() {
      console.info(`读取o的${key}属性:${value}`); //额外的操作
      return value;
    },
    set(newVal) {
      console.info(`设置o的${key}属性:${newVal}`); //额外的操作
      value = newVal;
    },
  });
}
```

实际开发中对象一般是多级

```js
let o ={
  list=[{}],
  ads=[{}],
  user:{}
}
```
怎么处理呢???递归

对于对象可以使用递归来响应式化,但是数组我们也需要处理

- push
- pop
- shift
- unshift
- reverse
- sort
- splice

要做什么事情呢?

1. 在改变数组的数据的时候,要发出通知
  - Vue2 中的缺陷,数组发生变化,设置length没法通知(Vue3中使用Proxy 语法 ES6 解决了 这个问题)
2. 加入的元素应该变成响应式的

技巧: 如果一个函数已经定义了,但是我们需要拓展其功能,我们的一般处理办法:
1. 使用一个临时的函数名储存函数
2. 重新定义原来的函数
3. 定义拓展的功能
4. 调用临时的那个函数


# 发布订阅模式
