import React, {Component} from 'react';
// import MonacoEditor from 'react-monaco-editor';
import Editor from '@monaco-editor/react';
import styles from './App.css';


// import monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js';
// import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';
//
//
//
// // @ts-ignore
// self.MonacoEnvironment = {
// 	// @ts-ignore
// 	getWorkerUrl: function(moduleId, label) {
// 		if (label === "json") {
// 			return "./json.worker.bundle.js";
// 		}
// 		if (label === "css") {
// 			return "./css.worker.bundle.js";
// 		}
// 		if (label === "html") {
// 			return "./html.worker.bundle.js";
// 		}
// 		if (label === "typescript" || label === "javascript") {
// 			return "./ts.worker.bundle.js";
// 		}
// 		return "./editor.worker.bundle.js";
// 	}
// };



export default class App extends Component {
	render() {
		return (
			<div className={styles.App}>

				{/*<MonacoEditor*/}
				{/*	width={800}*/}
				{/*	height={400}*/}
				{/*	language='javascript'*/}
				{/*/>*/}

				<Editor language='javascript' />

			</div>
		);
	}
};
