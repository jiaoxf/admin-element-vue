<template>
	<div class="element-container">
		<el-row :gutter="20">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				<el-divider content-position="left">
					步骤条
					<a target="_blank" href="https://element.eleme.cn/#/zh-CN/component/steps">
						文档
					</a>
				</el-divider>
				<steps-component
					:stepActive="active"
					:stepInfo="dataInfo"
					faDirection="vertical"
					faSpace="100px"
				/>
				<steps-component
					:stepActive="active"
					:stepInfo="dataInfo1"
					faDirection="vertical"
					faSpace="100px"
				/>
				<steps-component
					:stepActive="active"
					:stepInfo="dataInfo"
					faSuccess="success"
					:faSimple="simple"
					:textAlign="false"
				/>
				<steps-component
					:stepActive="active"
					:stepInfo="dataInfo1"
					faSuccess="success"
					:faSimple="simple"
					:textAlign="false"
				/>
				<steps-component :stepActive="active" :stepInfo="dataInfo" />
				<steps-component :stepActive="active" :stepInfo="dataInfo1" />
				<steps-component :stepActive="active" :stepInfo="dataInfo" />
				<el-alert
					title="这里使用keepAlive缓存组件&动态组件进行模拟步骤"
					type="warning"
					show-icon
				></el-alert>
				<keep-alive>
					<component
						v-bind:is="currentTabComponent"
						:ref="currentTabComponent"
					></component>
				</keep-alive>
				<el-button style="margin-top: 12px;" v-if="active !== 1" @click="last">
					上一步
				</el-button>
				<el-button style="margin-top: 12px;" v-if="active !== 3" @click="next">
					下一步
				</el-button>
				<el-button style="margin-top: 12px;" v-if="active === 3" @click="submit">
					完成
				</el-button>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import StepsComponent from './Steps'
import StepPageFirst from './StepPageFirst'
import StepPageSecond from './StepPageSecond'
import StepPageThird from './StepPageThird'
export default {
	name: 'steps',
	props: {},
	components: {
		StepsComponent,
		StepPageFirst,
		StepPageSecond,
		StepPageThird
	},
	data() {
		return {
			currentTab: 'First',
			tabs: ['First', 'Second', 'Third'],
			active: 1,
			simple: true,
			dataInfo: [
				{
					title: '步骤一',
					description: '这是步骤一',
					icon: 'el-icon-edit'
				},
				{
					title: '步骤二',
					description: '这是步骤二',
					icon: 'el-icon-upload'
				},
				{
					title: '步骤三',
					description: '这是步骤三',
					icon: 'el-icon-picture'
				}
			],
			dataInfo1: [
				{
					title: '步骤一',
					description: '这是步骤一'
				},
				{
					title: '步骤二',
					description: '这是步骤二'
				},
				{
					title: '步骤三',
					description: '这是步骤三'
				}
			]
		}
	},
	created() {},
	mounted() {},
	computed: {
		currentTabComponent: function() {
			return 'StepPage' + this.currentTab
		}
	},
	watch: {},
	methods: {
		last() {
			switch (this.active) {
				case 1:
					this.currentTab = 'First'
					break
				case 2:
					this.currentTab = 'Second'
					break
				case 3:
					this.currentTab = 'Third'
					break
				default:
					break
			}
			if (this.active-- < 0) this.active = 1
		},
		next() {
			/* let flag = null
      if(!this.$refs[this.currentTabComponent].needRule){
        flag = true
      }else{
        flag = this.$refs[this.currentTabComponent].validateForm()
      }
      if(flag){

      } */
			switch (this.active) {
				case 1:
					this.currentTab = 'First'
					break
				case 2:
					this.currentTab = 'Second'
					break
				case 3:
					this.currentTab = 'Third'
					break
				default:
					break
			}
			if (this.active++ > 2) this.active = 1
		},
		submit() {
			this.$confirm('保存数据, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$message({
						type: 'success',
						message: '保存成功!'
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消保存'
					})
				})
		}
	},
	activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
