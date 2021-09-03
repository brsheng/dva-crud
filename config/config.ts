import { defineConfig } from 'umi';

import Routes from './routes';

export default defineConfig({
	hash: true,
	antd: {},
	dva: {
		hmr: true,
	},
	history: {
		type: 'browser',
	},
	locale: {
		default: 'zh-CN',
		antd: false,
		title: false,
		baseNavigator: true,
		baseSeparator: '-',
	},
	dynamicImport: {
		loading: '@/components/PageLoading/index',
	},
	targets: {
		ie: 11,
	},
	routes: Routes,
	title: false,
	ignoreMomentLocale: true,
	manifest: {
		basePath: '/',
	},
	cssLoader: {
		modules: { localIdentName: '[local]' },
	},
	// esbuild: {},
	chainWebpack: (memo, { env, webpack, createCSSRule }) => {
		memo.module
			.rule('svg')
			.use('svgr')
			.loader('@svgr/webpack')
			.options({ babel: false, icon: true });
	},
	theme: {
		'primary-color': '#4259c1',
	},
});
