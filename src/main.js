import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "./plugins/index";
import "./styles/main.css";

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#container");
