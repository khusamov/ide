import {EditorProps as MonacoEditorProps} from '@monaco-editor/react';

/**
 * Настройки редактора.
 * @param props Динамические настройки редактора.
 */
export default function useMonacoEditorProps(props: MonacoEditorProps): MonacoEditorProps {
	return {
		width: '100%',
		height: '100%',
		loading: 'Загрузка редактора...',
		language: 'typescript',
		...props
	}
}