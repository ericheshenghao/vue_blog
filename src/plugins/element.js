import Vue from 'vue'
import {
    Button,
    ButtonGroup,
    Tooltip,
    Icon,
    Row,
    Col,
    Progress,
    Spinner,
    Badge,
    Image,
    Backtop,
    Notification,
    avatar,
    drawer
  } from 'element-ui';

  Vue.use(Button);
  Vue.use(ButtonGroup);

  Vue.use(Tooltip);

  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);

  Vue.use(Progress);
  Vue.use(Spinner);
  Vue.use(Badge);
  Vue.use(Image);
  Vue.use(Backtop);
  Vue.use(avatar);
  Vue.use(drawer);
  
  Vue.prototype.$notify = Notification;

