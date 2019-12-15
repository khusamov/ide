import React, {Component} from 'react';

export default class App extends Component {
	render() {
		return (
			<div className='App'>
				<div>Версия: {process.env.BUILD_VERSION}</div>
				<div>Дата сборки: {new Date(process.env.BUILD_DATE!).toString()}</div>
			</div>
		);
	}
};
