// 导入自己需要的组件
import { Switch, Button, Tooltip, Rate, Badge, Icon, Backtop, drawer,avatar } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Switch)
    Vue.use(Button)
    Vue.use(Tooltip)
    Vue.use(Badge)
    Vue.use(Icon)
    Vue.use(Rate)
    Vue.use(Backtop)
    Vue.use(drawer)
    Vue.use(avatar)
  }
}
export default element
