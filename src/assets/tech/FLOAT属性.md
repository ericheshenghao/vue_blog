
# float 属性

## 定义和用法
CSS 的 Float（浮动），会使元素向左或向右移动，其周围的元素也会重新排列。
指定一个box应该如何浮动。它可以为任何元素设置，但只适用于不是absolute定位的box的元素。

### 语法

>float: left | right | none | inline-start | inline-end;


### 清除浮动 - 使用 clear
元素浮动之后，周围的元素会重新排列，为了避免这种情况，使用 clear 属性。
clear 属性指定元素两侧不能出现浮动元素。

## 例
``` css
img
{
    float:right; //浮动
}
```

``` css
.text_line
{
    clear:both; //清除浮动
}
```



