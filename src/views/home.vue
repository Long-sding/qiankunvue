<template>
	<div id="container" class="page app-hidden-xy">
		<div class="app-fill app-h-start app-flex-column">
			<div class="app-h-between app-v-center pa-4 app-black text--white">
				<div class="app-font-22px font-weight-bold">检测平台</div>
				<div class="app-h-start app-v-center">
					<a-avatar style="backgroundcolor: #87d068" icon="user" />
					<div class="ml-2">用户名</div>
				</div>
			</div>
			<div>
				<a-menu v-model="current" mode="horizontal">
					<a-menu-item key="birdge">
						<router-link to="/home/bridge-check">桥梁检测</router-link>
					</a-menu-item>
					<a-menu-item key="tunnel">
						<router-link to="/home/tunnel-check">隧道检测</router-link>
					</a-menu-item>
				</a-menu>
			</div>

			<div class="app-flex-1 app-hidden-xy">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			current: ["birdge"],
		};
	},
};
</script>

<style lang="scss"></style>
