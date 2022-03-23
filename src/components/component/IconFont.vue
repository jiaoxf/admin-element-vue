<template>
	<div class="icon-font" :style="{ padding: paddingSize }">
		<svg class="icon" aria-hidden="true" :style="[iconStyle]">
			<use :xlink:href="iconTag"></use>
			<!-- <use xlink:href="#icon-caidan"></use> -->
		</svg>
	</div>
</template>
<script>
export default {
	name: 'name',
	props: {
		name: {
			type: String,
			default: ''
		},
		paddingSize: {
			type: String
		},
		iconStyle: {
			type: Object,
			default: () => {
				return {
					width: '18px',
					height: '18px'
				}
			}
		}
	},
	components: {},
	data() {
		return {}
	},

	computed: {
		iconTag() {
			return `#icon-${this.name}`
		}
	},

	watch: {},
	methods: {},
	created() {},
	mounted() {},
	activated() {}
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.icon-font {
	display: inline-flex;
	align-items: center;
	.icon {
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
}
</style>
