module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'plugin:prettier/recommended' // 添加 prettier 插件
	],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		"prettier/prettier": "off",
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		// 是否需要箭头函数参数中的括号  off/on
		'arrow-parens': 'off',
		// 禁止重新分配函数参数
		'no-param-reassign': [
			'error',
			{
				props: true,
				ignorePropertyModificationsFor: [
					'state', // for vuex state
					'acc', // for reduce accumulators
					'e', // for e.returnvalue
					'item',
					'_node'
				]
			}
		],
		// 禁用分号
		semi: [2, 'never'],
		// 禁止尾随逗号
		'comma-dangle': [2, 'never'],
		// 强制使用 tab 缩进
		indent: [
			0,
			'tab',
			{
				'SwitchCase': 1
			}
		],
		// 关闭禁用 tab
		'no-tabs': 0,
		"no-param-reassign": 0,
		// 禁止提前使用变量/函数
		'no-use-before-define': [
			2,
			{
				functions: false,
				classes: true
			}
		],
		// 关闭禁用 ++ 或 --
		'no-plusplus': [0],
		// 关闭使用字面量对象
		'object-shorthand': 0,
		// 关闭函数表达式必须有名字
		'func-names': 0,
		// 为运算符强制执行一致的换行样（增加可读性）
		'linebreak-style': [0, 'error', 'windows'],
		'no-mixed-spaces-and-tabs': 0
	}
}
