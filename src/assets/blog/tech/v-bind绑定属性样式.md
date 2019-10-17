# v-bind绑定属性样式


## html
``` html 
<div id="app" class="app" v-bind:class="{ 'active': theme}">
```

## css


``` css
@color-bg:#1A1A1A;  
@color-contrast-high:rgb(229, 229, 229); 


a {
    color:@color-bg
  }

.app.active {
  background-color: @color-bg;
  color: rgb(229, 229, 229);
  a {
    color:@color-contrast-high
  }
  ul li{
    border-bottom-color: @color-contrast-high
  }
}
```
