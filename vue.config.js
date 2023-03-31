const url = "http://192.168.203.103:9999";

const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
	lintOnSave: true,
	productionSourceMap: false,
	chainWebpack: config => {
		const entry = config.entry("app");
		entry.add("babel-polyfill").end();
		entry.add("classlist-polyfill").end();
	},
	css: {
		// 忽略 CSS order 顺序警告
		extract: { ignoreOrder: true },
		// requireModuleExtension: true,
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		}
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === "production") {
			// 仅在生产环境下启用该配置
			return {
				performance: {
					// 打包后最大文件大小限制
					maxAssetSize: 1024000
				},
				optimization: {
					minimizer: [
						new UglifyJsPlugin({
							uglifyOptions: {
								warnings: false,
								compress: {
									pure_funcs: ["console.log", "console.info"] //移除console
									// pure_funcs: [], //移除console
								}
							},
							sourceMap: false,
							parallel: true
						})
					]
				},
				plugins: [
					new CompressionWebpackPlugin({
						filename: "[path].gz[query]",
						algorithm: "gzip",
						test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
						threshold: 1024, // 只有大小大于该值的资源会被处理,当前配置为对于超过1k的数据进行处理，不足1k的可能会越压缩越大
						minRatio: 0.99, // 只有压缩率小于这个值的资源才会被处理
						deleteOriginalAssets: false // 删除原文件
					})
				]
			};
		}
	},
	// 配置转发代理
	devServer: {
		disableHostCheck: true,
		port: 9000,
		proxy: {
			"/rest": {
				target: url,
				ws: false, // 需要websocket 开启
				pathRewrite: {
					"^/rest": "/"
				}
			}
			// 3.5 以后不需要再配置
		}
	}
};
