import Vue from "vue";
import VueRouter from "vue-router";

import home from "@/views/home";
import login from "@/views/login";
import bridge from "@/views/bridge";
import tunnel from "@/views/tunnel";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/home",
		name: "home",
		component: home,
		redirect: "/home/bridge-check",
		children: [
			{
				path: "bridge-check",
				name: "bridge-check",
				component: bridge
			},
			{
				path: "tunnel-check",
				name: "tunnel-check",
				component: tunnel
			}
		]
	},
	{
		path: "/login",
		name: "login",
		component: login
	}
];

const router = new VueRouter({
	routes
});

export default router;
