import Vue from 'vue'
import {
    Button,
    Tooltip,
    Icon,
    Progress,
    Badge,
    Image,
    Backtop,
    Notification,
    avatar,
    drawer,
    Divider,
  } from 'element-ui';

  Vue.use(Button);
  Vue.use(Divider);
  Vue.use(Tooltip);
  Vue.use(Icon);
  Vue.use(Progress);
  Vue.use(Badge);
  Vue.use(Image);
  Vue.use(Backtop);
  Vue.use(avatar);
  Vue.use(drawer);
  
  Vue.prototype.$notify = Notification;

