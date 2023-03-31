import Vue from "vue";
import { Modal, message, Menu, Avatar } from "ant-design-vue";

import "ant-design-vue/dist/antd.less"; // 引入官方提供的 less 样式入口文件

Vue.use(Menu);
Vue.use(Avatar);

Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
