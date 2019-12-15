import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import {terser} from 'rollup-plugin-terser';
import deleteDist from 'rollup-plugin-delete';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import html from '@rollup/plugin-html'; // https://github.com/haifeng2013/rollup-plugin-bundle-html
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import smartAsset from 'rollup-plugin-smart-asset';
import typeScript from 'rollup-plugin-typescript2';
import {template} from './rollup.html';
import pkg from './package.json';

const distinationPath = 'dist';
const isDevelopment = process.argv.includes('--watch'); // process.env.ROLLUP_WATCH
const isProduction = !isDevelopment;

const getPlugins = options => [
	isDevelopment && livereload(distinationPath),
	isDevelopment && serve({
		open: true,
		contentBase: distinationPath
	}),
	isProduction && terser(),
	// https://github.com/vladshcherbin/rollup-plugin-delete
	isProduction && deleteDist({
		targets: distinationPath
	}),
	progress({
		clearLine: false
	}),

	replace({
		'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
		'process.env.BUILD_VERSION': JSON.stringify(pkg.version),
		'process.env.BUILD_DATE': JSON.stringify(+new Date)
	}),
	resolve({
		browser: true
	}),
	commonjs({
		namedExports: {
			'react': ['Children', 'Component', 'PropTypes', 'createElement'],
			'react-dom': ['render']
		}
	}),

	// https://github.com/rollup/plugins/tree/master/packages/html
	html({
		template,
		title: pkg.description || pkg.name,
		attributes: {html: {lang: 'ru'}}
	}),

	json(),

	postcss({
		modules: true
	}),

	// https://github.com/rollup/rollup-plugin-url/issues/18
	smartAsset({
		url: 'copy',
		keepImport: true
	}),

	typeScript({
		objectHashIgnoreUnknownHack: true, // https://github.com/ezolenko/rollup-plugin-typescript2
		tsconfig: 'tsconfig.json',
		tsconfigOverride: {
			compilerOptions: {
				target: options.target
			}
		}
	})
];

export default {
	input: 'src/index.tsx',
	plugins: getPlugins({target: 'es5'}),
	output: {
		experimentalCodeSplitting: true,
		external: ['react', 'react-dom'],
		globals: {
			'react': 'React',
			'react-dom': 'ReactDOM'
		},
		file: 'dist/index.js',
		format: 'iife',
		sourcemap: true
	}
};