import typeScript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import smartAsset from 'rollup-plugin-smart-asset';
import html from '@rollup/plugin-html';
import json from '@rollup/plugin-json';

const getPlugins = options => [
	commonjs(),
	json(),

	// https://github.com/rollup/plugins/tree/master/packages/html
	html({
		title: 'App',
		attributes: {
			html: {
				lang: 'ru'
			}
		}
	}),

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
	input: 'src/index.ts',
	plugins: getPlugins({target: 'es5'}),
	output: {
		file: 'dist/index.js',
		format: 'iife',
		sourcemap: true
	}
};