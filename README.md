# TurnTable 转盘组件 

## 介绍

插入转盘组件

组件支持函数调用和组件调用 


## 注意

为了css能够被px2rem识别到并进行rem转换，这里将css提取了出来，请务必记得手动载入样式

## 组件调用

`TurnTable`组件可添加props属性后直接插入使用，可自己在组件上添加class或使用className属性自定义类名覆盖样式
```js
import '@kafan/vue-turntable/lib/index.css'

import TurnTable from '@kafan/vue-turntable'

// 全局注册
Vue.use(TurnTable)
// 使用
<template>
    <v-turntable 
        className="test" 
        :lottery-list="lotteryList" 
        @lottery-start="lotteryStart" 
        @lottery-end="lotteryEnd"
        odd-bg-color="#ffd3d3"
        even-bg-color="#fff"
        :duration="1500">
        <template v-slot:goods>
            <span 
                v-for="(item,index) in lotteryList" 
                :key="index" 
                class="testItem" 
                :style="{'width': `${Math.PI * 100 / lotteryList.length}%`,
                'transform':`translateX(-50%) rotate(${(2 * index + 1) * 180 / lotteryList.length}deg)`}"
            >
                {{item.name}}
            </span>
        </template>
    </v-turntable>
</template> 

<script>
export default {
    data(){
        return {
            lotteryList: []
        }
    },
    methods:{
        lotteryStart(fn){
            //do something
        },
        lotteryEnd(reset){
            //do something
        }
    }
}
</script>
```
## props

组件调用时， 支持传入以下 `props`：

| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| lottery-list | 奖品列表 | `Array` | `[]` | `[{name:'',icon:''}]` |
| odd-bg-color | 奇数列背景色 | `String` | `#fff` | - |
| even-bg-color | 偶数列背景色 | `String` | `#f1deff` | - |
| third-bg-color | 奇数奖品3倍数列背景色 | `String` | `#dcf8fe` | - |
| oX | 圆心x轴坐标 | `Number` | 129 | - |
| oY | 圆心y轴坐标 | `Number` | 129 | - |
| radius | 转盘半径 | `Number` | 129 | - |
| className | 自定义类名 | `String` | - | - |
| duration | 转盘动画持续时长 | `Number` | 2000 | 毫秒(ms) |


## 事件监听

组件调用时， 会触发以下事件，可供监听回调：

| 事件 | 返回值 | 触发说明 | 备注 |
|------|------|------|------|
| lottery-start | lottery[is:转动函数] | 点击抽奖按钮时 | lottery参数请传入中奖奖品索引id |
| lottery-end | reset[is:重置函数] | 转盘动画结束时 | 可执行动画结束后相关回调 |
 

## 插槽使用

本组件有具名插槽goods和btn供使用，即自定义转盘每个奖品项的显示内容以及自定义抽奖按钮

示例

```js
    <template v-slot:goods>
        <p v-for="(item,index) in lotteryList" :key="index">{{item}}</p>
    </template>

    <template v-slot:btn>
        <a class="xxx">按钮文案</a>
    </template>
```

```

## 函数调用

```js

import TurnTable from '@kafan/vue-turntable'

TurnTable({
    lotteryList:[{
        name:'xxx',
        icon:'http://xxxx.png'
    },{
        name:'yy',
        icon:'http://yy.png'
    }],
    targetContainer:document.querySelectorAll('.lottery')[0],
    className:'test',
    duration:1000,
    slotScoped:()=>{
        return {
            "btn":{tag:'span', data:{style: {display:'flex','align-items':'center','justify-content':'center',width:'100px',height:'100px',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)','border-radius':'100%',background:'blue',color:'#fff','font-size':'18px'}}, text:'test'}
        }
    },
    lotteryStart:(fn)=>{
        fn(1)
    },
    lotteryEnd:(reset)=>{
        alert(111);
        reset()
    }
})

//可赋值到Vue原型上供全局使用
Vue.prototype.$TurnTable = TurnTable

``` 

## options

函数调用时， 支持传入以下 `options`：

| 参数 | 说明 | 类型 | 默认值 | 备注 |
|------|------|------|------|------|
| lotteryList | 奖品列表 | `Array` | `[]` | `[{name:'',icon:''}]` |
| oddBgColor | 奇数列背景色 | `String` | `#fff` | - |
| evenBgColor | 偶数列背景色 | `String` | `#f1deff` | - |
| thirdBgColor | 奇数奖品3倍数列背景色 | `String` | `#dcf8fe` | - |
| oX | 圆心x轴坐标 | `Number` | 129 | - |
| oY | 圆心y轴坐标 | `Number` | 129 | - |
| radius | 转盘半径 | `Number` | 129 | - |
| className | 自定义类名 | `String` | - | - |
| duration | 转盘动画持续时长 | `Number` | 2000 | 毫秒(ms) |
| targetContainer | 插入的容器 | `Object` | document.body | - |
| lotteryStart | 抽奖开始回调 | `Function` | (fn) => {} | `fn(index)传入中奖奖品索引` |
| lotteryEnd | 抽奖结束回调 | `Function` | (reset) => {} | `reset()可重置转盘` |
| slotScoped | 插槽函数 | `Function` | () => {} | `[() => Object{"name":VNode}]` |
