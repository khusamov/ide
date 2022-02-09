import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';

import smartAsset from 'rollup-plugin-smart-asset';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import {terser} from 'rollup-plugin-terser';
import deleteDist from 'rollup-plugin-delete';
import progress from 'rollup-plugin-progress';

import {htmlTemplate} from './rollup.html';
import pkg from './package.json';

/**
 * Директория сборки.
 * В эту директорию собираются также файлы в режиме ROLLUP_WATCH.
 */
const distPath = 'build';

/**
 * Флаги с типами окружения.
 */
const isDevelopment = process.env.ROLLUP_WATCH === 'true';
const isProduction = !isDevelopment;

/**
 * Настройки RollupJS.
 */
export default {
	input: {
		index: 'src/index.tsx'
	},
	output: {
		globals: {
			'react': 'React',
			'react-dom': 'ReactDOM'
		},
		external: ['react', 'react-dom', 'react-monaco-editor', 'monaco-editor'],
		entryFileNames: '[name].js',
		dir: distPath,
		format: 'es',
		sourcemap: true
	},
	plugins: [
		resolve(),
		commonjs(),
		typescript(),
		json(),

		replace({
			preventAssignment: true,
			values: {
				'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production'),
				'process.env.BUILD_VERSION': JSON.stringify(pkg.version),
				'process.env.BUILD_DATE': JSON.stringify(+new Date)
			}
		}),

		html({
			template: htmlTemplate,
			title: pkg.description || pkg.name,
			attributes: {html: {lang: 'ru'}}
		}),

		smartAsset({
			url: 'copy',
			keepImport: true
		}),

		postcss({modules: true}),

		isDevelopment && livereload(distPath),

		isDevelopment && serve({
			open: true,
			contentBase: distPath
		}),

		isProduction && terser(),

		// https://github.com/vladshcherbin/rollup-plugin-delete
		isProduction && deleteDist({
			targets: distPath
		}),

		progress({
			clearLine: false
		})
	]
};