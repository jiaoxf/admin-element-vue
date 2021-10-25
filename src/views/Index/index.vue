<template>
	<div class="index-container">
		<el-row :gutter="20">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-alert v-if="noticeList[0]" :closable="noticeList[0].closable">
					<div style="display: flex; align-items: center; justify-content: center">
						<a target="_blank" href="https://github.com/chuzhixin/vue-admin-beautiful">
							<img
								style="margin-right: 10px"
								src="https://img.shields.io/github/stars/chuzhixin/vue-admin-beautiful?style=flat-square&label=Stars&logo=github"
							/>
						</a>
						<p v-html="noticeList[0].title"></p>
					</div>
				</el-alert>
			</el-col>
			<el-col
				v-for="(item, index) in iconList"
				:key="index"
				:xs="12"
				:sm="6"
				:md="3"
				:lg="3"
				:xl="3"
			>
				<router-link to="#" target="_blank">
					<el-card class="icon-panel" shadow="never">
						<p>{{ item.title }}</p>
					</el-card>
				</router-link>
			</el-col>
			<el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
				<el-card shadow="never">
					<div slot="header">
						<span>授权数</span>
					</div>
					<div class="bottom">
						<span>
							总授权数:
						</span>
					</div>
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
				<el-card shadow="never">
					<div slot="header">
						<span>授权数</span>
					</div>
					<div class="bottom">
						<span>
							总授权数:
						</span>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'Index',
	components: {},
	data() {
		return {
			timer: 0,
			updateTime: process.env.VUE_APP_UPDATE_TIME,
			nodeEnv: process.env.NODE_ENV,
			config1: {
				startVal: 0,
				endVal: 0,
				decimals: 0,
				prefix: '',
				suffix: '',
				separator: ',',
				duration: 8000
			},
			config2: {
				startVal: 0,
				endVal: 0,
				decimals: 0,
				prefix: '',
				suffix: '',
				separator: ',',
				duration: 8000
			},
			config3: {
				startVal: 0,
				endVal: 0,
				decimals: 0,
				prefix: '',
				suffix: '',
				separator: ',',
				duration: 8000
			},

			//更新日志
			reverse: true,
			activities: [],
			noticeList: [],
			//其他信息
			userAgent: navigator.userAgent,
			//卡片图标
			iconList: [
				{
					icon: 'video',
					title: '视频播放器',
					link: '/vab/player',
					color: '#ffc069'
				},
				{
					icon: 'table',
					title: '表格',
					link: '/vab/table/comprehensiveTable',
					color: '#5cdbd3'
				},
				{
					icon: 'laptop-code',
					title: '源码',
					link: 'https://github.com/chuzhixin/vue-admin-beautiful',
					color: '#b37feb'
				},
				{
					icon: 'book',
					title: '书籍',
					link: '',
					color: '#69c0ff'
				},
				{
					icon: 'bullhorn',
					title: '公告',
					link: '',
					color: '#ff85c0'
				},
				{
					icon: 'gift',
					title: '礼物',
					link: '',
					color: '#ffd666'
				},

				{
					icon: 'balance-scale-left',
					title: '公平的世界',
					link: '',
					color: '#ff9c6e'
				},
				{
					icon: 'coffee',
					title: '休息一下',
					link: '',
					color: '#95de64'
				}
			]
		}
	},
	created() {},
	beforeDestroy() {
		clearInterval(this.timer)
	},
	mounted() {},
	methods: {
		handleClick(e) {
			this.$baseMessage(`点击了${e.name},这里可以写跳转`)
		},
		handleChangeTheme() {
			this.$baseEventBus.$emit('theme')
		}
	}
}
</script>
<style lang="scss" scoped>
.index-container {
	padding: 0 !important;
	margin: 0 !important;
	background: #e9eef3 !important;

	::v-deep {
		.el-alert {
			padding: $base-padding;

			&--info.is-light {
				min-height: 82px;
				padding: $base-padding;
				margin-bottom: 15px;
				color: #909399;
				background-color: $base-color-white;
				border: 1px solid #ebeef5;
			}
		}
		.el-card {
			border-radius: 10px;
		}
		.el-card__body {
			.echarts {
				width: 100%;
				height: 115px;
			}
		}
	}
	.card {
		::v-deep {
			.el-card__body {
				.echarts {
					width: 100%;
					height: 305px;
				}
			}
		}
	}

	/* .bottom {
		padding-top: 20px;
		margin-top: 5px;
		color: #595959;
		text-align: left;
		border-top: 1px solid $base-border-color;
	} */

	.table {
		width: 100%;
		color: #666;
		border-collapse: collapse;
		background-color: #fff;

		td {
			position: relative;
			min-height: 20px;
			padding: 9px 15px;
			font-size: 14px;
			line-height: 20px;
			border: 1px solid #e6e6e6;

			&:nth-child(odd) {
				width: 20%;
				text-align: right;
				background-color: #f7f7f7;
			}
		}
	}

	.icon-panel {
		height: 117px;
		text-align: center;
		cursor: pointer;

		svg {
			font-size: 40px;
		}

		p {
			margin-top: 10px;
		}
	}

	.bottom-btn {
		button {
			margin: 5px 10px 15px 0;
		}
	}
}
</style>
