<!--
 * @Author: LuLu
 * @Date: 2022-03-29 21:09:28
 * @LastEditors: LuLu
 * @LastEditTime: 2022-03-31 22:13:00
 * @FilePath: \vue-src-course\README.md
 * @Description: 
 * https://github.com/lululutx
 * Copyright (c) 2022 by LuLu, All Rights Reserved. 
-->



数据驱动

前提：
    1.你一定用过vue
    2.如果没有用过，可以去官网看看

# Vue与模板

使用步骤:

    1.编写 页面 模板
        1.直接写 HTML标签
        2.使用template
        3.使用 单文件 （<template />）
    2.创建Vue实例
        1.在Vue 的构造函数中，提供 data，methods，computed，watcher，props，。。。
    3.将Vue挂载到页面中（mount）

# 数据驱动模型

Vue的执行流程
    1.获得模板：模板中有“坑”
    2.利用Vue构造函数提供的数据来“填坑”，得到可以在页面中显示的标签了。
    3.替换页面中有"坑"的位置

Vue利用我们提供的数据 和页面中的模板 生成了一个新的Html标签 (node元素),替换掉页面中放置模板的位置.

# 简单的模板实现





# 虚拟DOM

目标:
    1.怎么将真正的DOM转化为虚拟DOM
    2.这么把虚拟DOM转化为真正的DOM

思路与深拷贝类似