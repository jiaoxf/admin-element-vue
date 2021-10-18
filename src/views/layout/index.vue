<template>
	<div class="home " :class="[$store.state.foldMenu ? 'close-sidebar' : 'open-sidebar']">
		<el-container>
			<left-menu />
			<el-container class="body-content">
				<Header />
				<el-main>
					<div class="main-content">
						<router-view />
					</div>
				</el-main>
				<!-- <el-footer>Footer</el-footer> -->
			</el-container>
		</el-container>
	</div>
</template>

<script>
import LeftMenu from '@/views/layout/components/LeftMenu'
import Header from '@/views/layout/components/Header'
export default {
	name: 'Layout',
	components: {
		LeftMenu,
		Header
	}
}
</script>
<style lang="scss" scoped>
.el-header,
.el-footer {
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-aside {
	background-color: #d3dce6;
	color: #333;
	text-align: center;
	line-height: 200px;
	display: block;
	position: absolute;
	left: 0;
	top: 60px;
	bottom: 0;
}
.open-sidebar {
	.body-content {
		margin-left: 230px;
	}
}
.close-sidebar {
	.body-content {
		margin-left: 64px;
	}
}
.body-content {
	position: relative;
	flex-direction: column;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	/* text-align: center; */
	/* line-height: 160px; */
	margin-top: 60px;
	/* overflow-y: scroll; */
	.main-content {
		/* margin:20px; */
		background: #fff;
		border-radius: 6px;
		min-height: calc(100vh - 100px);
	}
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}
</style>
