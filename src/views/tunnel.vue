<template>
	<div id="tunnel-check-page"></div>
</template>

<script>
import { start } from "qiankun";

export default {
	data() {
		return {};
	},

	mounted() {
		if (!window.qiankunStarted) {
			window.qiankunStarted = true;
			start(); // 启动 qiankun
		}
	},
};
</script>

<style>
</style>