const genActiveRule = routerPrefix => {
	return location => location.pathname.startsWith(routerPrefix);
};

const microApps =
	process.env.NODE_ENV === "production"
		? // href 地址 请填写 子项目 package.json里的name 字段
		  [
				// 生产环境 子应用 配置项
				// 整个微服务采用了 browserhistory模式
				// ======= 单独部署 ======
				//  填写 项目url 地址 如 https://aistatic.huiqulx.com
				// =======  部署在 主应用下的目录里  ======
				// ------- 修改 vue.config.js 中的publicPath
				// 部署的时候 如果在根目录下 请填写 process.env.VUE_APP_BASE_PATH
				// 如果单独部署 直接填写 url地址 如 https://aistatic.huiqulx.com/
				// 单独部署 请注意 是 history 路由模式 请 nginx 支持
				{ name: "sub-app1", entry: "/subapp/sub-app1/index.html", href: "/bridge-check" },
				{ name: "sub-app2", entry: "/subapp/sub-app2/index.html", href: "/tunnel-check" }
		  ]
		: [
				// 开发环境 子应用 配置项
				{ name: "bridge-check", entry: "//localhost:8081", href: "/bridge-check" },
				{ name: "tunnel-check", entry: "//localhost:8082", href: "/tunnel-check" }
		  ];

// 如果 编辑  子应用信息异常 抛出 错误
for (let i = 0; i < microApps.length; i++) {
	if ("/" + microApps[i].name !== microApps[i].href) {
		throw `${microApps[i].name}子应用: 请保证name字段和href字段 一致 例子 name: bridge-check href: /bridge-check`;
	} else if (!microApps[i].entry) {
		throw `${microApps[i].name}子应用: 请填写 entry字段`;
	}
}

export { microApps, genActiveRule };
