---
title: Typescript食用方法
date: '2019-12-11'
category: tech
tags: typescript
note: 基于vuepress的个人博客，实现了博客自动路由、默认主题修改、elementUI库集成、mp3背景播放、标签墙、评论功能
---
[[toc]]
## 基础类型
### 数字
``` ts
// 数组类型
let list: number[] = [1,2,3]
//上面和下面的意思是一样的
let list: Array<number> = [1,2,3]
// 元组类型
let x: [string,number]
x = ['hello',10]
x= [10 ,'hello'] //报错
x[3] = 1 //报错
```
### 枚举
``` ts
enum Color{
    red,
    green,
    blue
}
let c:Color = Color.Green
// 也可以修改编号
enum Color{
    red = 1,
    green =3,
    blue = 2
}
let colorName:string = Color[2]
```
### any类型
``` ts
let notsure:any = 4
notsure = "maybe a string instead"
notsure = false
let list: anyp[] = [1,true,"free"]
```
### void类型,没有返回值
``` ts
function warnUser(): void {
    console.log("this is my waring message")
}
```
### null和undefined类型
``` ts
// 严格模式下会报错
let num: number = 3
num = null 
```
### never类型,常用场景抛出错误：
``` ts
function error(message:string):never {
    throw new Error(message)
}
function fail(){
    return error("something failed")
}
function infiniteLoop():never {
    while(true){
        //不会报错
    }
}
```
### object类型
``` ts
declare function create(o: object | null ):void;
create(o:{prop:0})
create(o:null)
// 下面的会报错
create(o:42)
create(o:string)
create(o:false)
```
### 断言类型(自己提供类型声明)
``` ts
let someValue: any = "this is a string"
let strlength: number  = (someValue as string).length
```
## 变量声明
### var 声明
``` ts
function f(){
    var a = 10 
    return function g(){
        var b = a +1
        return b
    }
}
var g = f()
g() //11
```
``` ts
function f(shouldInitialize){
    if(shouldInitialize){
        var x = 10
    }
    return x
}
f(true)
f(false) // undefined
```
``` ts
function sumMatrix(matrix){
    var sum = 0
    for(var i =0;i<matrix.length;i++){
        var currentRow = matrix[i]
        for(var i =0;i<matrix.length;i++){ //改成j或者声明为let可以，经典例子
        sum += currenRow[i]
    }
    }
    return sum //错误
}
var matrix = [
    [1,2,3],
    [4,5,6]
]
sumMatrix(matrix)
```
``` ts
for(var i =0;i<10;i++){ //这里用let声明创建一个块级作用域更简单
    // for循环已经执行完了
    setTimeout(function (){
        console.log(i) //i=10
    },100*i)
}
// 修改后
for(var i =0;i<10;i++){ 
    //每次循环将i传给匿名函数
(function (j){
 setTimeout(function (){
        console.log(j) //i=10
    },100*j)
    })(i)
}
```
### let 声明
``` ts
function f(input:boolean){
    let a = 100 
    if(input){
        let b = a + 1
        return b
    }
    return b
}
```
``` ts
a++ 
let a = 1 //报错

function foo(){
    return a 
}
foo()
let a //变量不会提升
```
 
``` ts
function f(condition,x){
   if(condition){   `                                               
       let x = 100
       return x 
   }
   return x
}
f(condition:false,x:0)
```
### const 声明
理解为对let的增强
``` ts
const kitty = {
    name:"kitty"，
    numlives: 9
}
//可以对属性进行修改
kitty.name = "jerry"
kitty.numlives--
```
## 解构和展开

### 数组解构
``` ts
let input:[number,number] = [1,2]
let first =input[0]
let second =input[1]

function(f([first,second]:[number,number]){
    console.log(first)
    console.log(second)
})
f(input)
```
剩余变量
``` ts
let [first,...rest] = [1,2,3,4]
console.log(first)
console.log(rest)
```
### 对象解构
``` ts
let o ={
    a:"foo",
    a:12,
    c:"bar"
}
let {a,...passthrough} = o
let total = passthrough.b + passthrough.c.length
console.log(total) //15
```
## 接口
### 接口初探
控制台打印了label中所包含的字符串
<iframe height="400" style="width: 100%;" scrolling="no" title="ts-api" src="https://codepen.io/ericheshenghao/embed/vYEGwZv?height=265&theme-id=dark&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ericheshenghao/pen/vYEGwZv'>ts-api</a> by 何先森
  (<a href='https://codepen.io/ericheshenghao'>@ericheshenghao</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 可选属性
``` ts
interface Square{
color:string
area:number
}
interface SquareConfig{
  color?: string
  width?: number
}
function createSquare(config:SquareConfig):Square{
  let newSquare ={color:"white",area:100}
  if(config.color){
    newSquare.color=config.color
  }
  if(config.width){
    newSquare.area=config.width*config.width
  }
  return newSquare
}
let mySquare = createSquare(config:{color:'black'})
```
## 类的继承
``` ts
class Animal {
    name:string
    constructor(name:string){
        this.name = name
    }
    move(distance: number = 0){
        console.log(`${this.name} moved ${distance}m`)
    }
}
class Snake extends Animal {
    constructor(name:string){
        // 调用父类的构造器
        super(name)
    }
    move(distance: number =5){
        // 蛇要发出嘶嘶的声音
        console.log("Slithering...")
        // 调用父类的移动方法
        super.move(distance)
    }
}

class Horse extends Animal{
    constructor(name:string){
        super(name)
    }
    //马飞奔
    move(distance:number = 45){
        console.log("Galloping....")
        super.move(distance)
    }
}
let sam =new Snake("Sammy")
let tom =new Horse("Tommy")
sam.move()
tom.move(10)
```