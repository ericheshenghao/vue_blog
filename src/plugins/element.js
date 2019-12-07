// import Vue from 'vue'
import {
    Button,
    Tooltip,
    Icon,
    Progress,
    Badge,
    // Image,
    Input,
    // Notification,
    Avatar,
    Drawer,
    Divider,
    Message,
  } from 'element-ui';

  Vue.use(Button);
  Vue.use(Divider);
  Vue.use(Tooltip);
  Vue.use(Icon);
  Vue.use(Progress);
  Vue.use(Badge);
  Vue.use(Input)
  // Vue.use(Image);
  Vue.use(Avatar);
  Vue.use(Drawer);
  
  Vue.prototype.$message = Message;

