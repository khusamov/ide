import MonacoEditor from '@monaco-editor/react';
import useEditor from './useEditor';
import IEditorProps from './IEditorProps';

export default function Editor(props: IEditorProps) {
	const [monacoEditorProps, editorDisplay, editorWrapRef] = useEditor(props)
	return (
		<div ref={editorWrapRef} style={{height: '100%', overflow: 'hidden'}}>
			<div style={{height: '100%', display: editorDisplay}}>
				<MonacoEditor {...monacoEditorProps}/>
			</div>
		</div>
	)
}