<!--
 * @Author: LuLu
 * @Date: 2022-03-29 21:09:28
 * @LastEditors: LuLu
 * @LastEditTime: 2022-06-08 22:32:49
 * @FilePath: \vue-src-course\README.md
 * @Description:
 * https://github.com/lululutx
 * Copyright (c) 2022 by LuLu, All Rights Reserved.
-->

**根据 b 站视频 BV1LE411e7HE 的学习记录**

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
  configurable,
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

- Vue2 中的缺陷,数组发生变化,设置 length 没法通知(Vue3 中使用 Proxy 语法 ES6 解决了 这个问题)

2. 加入的元素应该变成响应式的

技巧: 如果一个函数已经定义了,但是我们需要拓展其功能,我们的一般处理办法:

1. 使用一个临时的函数名储存函数
2. 重新定义原来的函数
3. 定义拓展的功能
4. 调用临时的那个函数

扩展数组的方法 push 和 pop 怎么处理呢???

- 直接修改 prototype **不行**
- 修改要进行响应式化的数组原型 ( **proto** )

目前已经将对象改成响应式的了,但是如果直接给对象赋值,赋值另一个对象,那么就不是响应式得了

# 发布订阅模式

任务：

- 作业
- 代理方法(app.name,app.\_data.name)
- 事件模型(node:event 模块)
- vue 中发布订阅模式 Observer Watcher Dep

代理方法就是将 app.\_data 中的成员映射到 app 上
由于需要在更新数据的时候,更新页面的内容
所以 app.\_data 访问的成员与 app 访问的成员应该是同一个成员

由于 app.\_data 已经是响应式的对象了,只需要 app 访问的成员去访问 app.\_data 的对应的成员就行了
例如

```js
app.name 转换为 app._data.name
app.xxx 转换为 app._data.xxx
```

vue 中引入了一个函数 proxy(target,src,prop),target 相当于 app,src 相当于 app.\_data,prop 相当于 name
将 target 的操作映射到 src.prop 上
这里是因为当时没有`Proxy`语法(ES6)

我们之前处理 reactify 方法已经不行了,我们需要新的方法来处理
我们提供一个 Observer 的方法(观察者),在这个方法中对属性进行处理
我们也可以将这个方法封装到 initData 当中

## 解释 proxy

```js
app._data.name
//Vue设计,不希望访问 _ 开头的数据
//Vue中有一个潜规则 _开头的数据是私有数据尽量不要访问 $开头的数据是只读数据

//访问app的xxx 就是在访问app._data.xxx

function proxy(app,key){
  Object.defineProperty(app,key){
    get(){
      return app._data[key]
    },
    set(newVal){
      app._data[key] = newVal
    }
  }
}

//问题 在Vue中不止有data属性 prop以及其他

function proxy(app,prop,key){
  Object.defineProperty(app[prop],key){
    get(){
      return app[prop]._data[key]
    },
    set(newVal){
      app._data[prop][key] = newVal
    }
  }
}
//如果将data的成员映射到实例上
proxy(实例,'_data',属性名)
//如果将prop的成员映射到实例上
proxy(实例,'_prop',属性名)
```

## 发布订阅模式

目的:解耦,让各个模块之间没有紧密的联系

现在的处理办法 是属性更新的时候调用 mountComponent 方法
问题:mountComponent 更新的是什么东西?(现在) 是全部的页面 -->当前虚拟 DOM 对应的页面 DOM
在 Vue 中 整个的更新是按照组件为单位来进行**判断**,以节点为单位进行更新

- 如果代码中没有自定义组件,那么在比较算法的时候,我们会将全部模板对应的虚拟 DOM 进行比较
- 如果我们的代码中含有自定义组件,那么在比较算法的时候,就会判断更新的是哪一些组件中的属性,只会判断更新数据的组件,其他组件不会更新.

复杂的页面是由很多组件构成的,每一个属性要更新的时候,都要调用更新方法.这样性能会变低

**我们的目标:如果修改了什么属性,就尽可能只更新这些属性对应的页面**

这样就一定不能将更新的代码写死

例子:双十一预售,告诉老板,如果东西到了,就告诉我.
老板就是发布者,我就是订阅者 订阅什么东西作为中间媒介

使用代码的结果来藐视

1. 老板提供一个 账簿 (数组)
2. 我可以根据需求,订阅我的商品(老板要记录下来 谁 订了什么东西,在数组中存储某些东西)
3. 等待,可以做其他的事情
4. 当货品来到的时候,老板就查看账簿,挨个打电话(遍历数组,取出数组里面的元素来使用)

实际上就是事件模型

1. 有一个 event 对象
2. on,off,emit 方法

想办法实现事件模型,思考,怎么用

- event 是一个全局对象
- event.on('事件名',处理函数) 来订阅注册事件
  - 事件可以连续订阅
  - 还可以移除 event.off
    - 移除所有
    - 移除某个类型的
    - 移除某一个类型的某一个处理函数
- 写别的代码
- 一旦 event.emit('事件名',参数),先前注册的事件处理函数就会依次调用

介绍的原因:

- 用来描述发布订阅模式
- 后面会使用到

发布订阅模式(形式不局限于函数,形式也可以是对象等):

1.  中间的**全局的容器**,用来**存储**可以被触发的东西(函数,对象)
1.  还需要一个方法，可以往容器中**传入**东西（函数，对象）
1.  需要一个方法，可以将容器中的东西取出来**使用**（函数使用，对象方法的调用）

Vue 模型 是怎么实现发布订阅的呢  
页面中的变更(diff)是以组件为单位的
- 如果页面中只有一个组件(Vue实例),不会有性能损失
- 如果页面中有多个组件(多Watcher的一种情况),第一次会有多个组件的watcher存入到全局Watcher中
  - 如果修改了局部的数据(例如其中一个组件的数据)
  - 表示只会对该组件的diff算法,也就是说只会重新生成该组件的抽象语法树
  - 只会访问该组件的watcher
  - 也就是表示再次往全局存储的只有该组件的watcher
  - 页面更新的时候,也就只需要更新一部分

![Watcher](./mdPic/Watcher.png)


# 改写 observe函数

缺陷:
- 无法处理数组
- 响应式无法在中间集成Watcher处理
- 我们实现的rectify需要和实例紧紧的绑定在一起,分离(解耦)

## 问题

- observe 还没对单独的数组元素进行处理吧？

# 引入Watcher

问题:

- 模型(图)
- 关于this的问题


实现:
分成两步:
1. 只考虑修改后刷新(响应式的核心算法)
2. 再考虑依赖收集(优化)

在Vue中,提供一个构造函数  Watcher
Watcher 会有一些方法:

- get() 用来进行**计算**或**执行**处理函数
- update() 公共的外部方法,该方法会触发内部的run方法
- run() 用来判断是内部是异步运行还是同步运行等,这个方法最终会调用内部的get方法
- cleanupDep() 简单理解为清楚队列 

我们的页面渲染是上面哪个方法执行的??? get

我们的watcher实例有一个属性 vm,表示的就是当前的vue实例 