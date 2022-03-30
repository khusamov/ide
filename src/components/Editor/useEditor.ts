import {EditorProps as MonacoEditorProps} from '@monaco-editor/react';
import IEditorProps from './IEditorProps';
import useMonacoEditorProps from './useMonacoEditorProps';
import useEditorDisplay, {TDisplay, TEditorWrapRef} from './useEditorDisplay';

export default function useEditor({value, onChange, hidden}: IEditorProps): [MonacoEditorProps, TDisplay, TEditorWrapRef] {
	const [editorWrapRef, editorDisplay] = useEditorDisplay(hidden)
	const monacoEditorProps = useMonacoEditorProps({value, onChange})
	return [monacoEditorProps, editorDisplay, editorWrapRef]
}