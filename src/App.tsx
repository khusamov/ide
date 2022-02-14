import {useRef, useState} from 'react';
import Editor, {OnChange, EditorProps} from '@monaco-editor/react';
import useResizeHide from './hooks/useResizeHide';
import {Splitter, SplitterPanel, SplitterProps} from './Splitter';

export default function VariableWidthGrid() {
	const [codeSourceText, setCodeSourceText] = useState<string | undefined>()
	const onEditorChange: OnChange = value => setCodeSourceText(value)

	const editorWrapRef = useRef<HTMLDivElement>(null)
	const [isEditorWrapResize] = useResizeHide(editorWrapRef)

	const editorDisplayHide = 'none'
	const editorDisplayShow = 'block'
	const [splitterResizeState, setSplitterResizeState] = useState<string>('end')
	const onResizeStart = () => setSplitterResizeState('start')
	const onResizeEnd = () => setSplitterResizeState('end')

	const editorDisplay = (
		isEditorWrapResize || splitterResizeState === 'start'
			? editorDisplayHide
			: editorDisplayShow
	)

	const splitterProps: SplitterProps = {
		onResizeStart,
		onResizeEnd,
		stateKey: 'application-splitter',
		stateStorage: 'local',
		style: {height: '100%'}
	}

	const editorProps: EditorProps = {
		width: '100%',
		height: '100%',
		loading: 'Загрузка редактора...',
		language: 'typescript',
		value: codeSourceText,
		onChange: onEditorChange
	}

	return (
		<Splitter {...splitterProps}>
			<SplitterPanel size={20}>
				Panel 1
			</SplitterPanel>
			<SplitterPanel size={80}>
				<div ref={editorWrapRef} style={{height: '100%', overflow: 'hidden'}}>
					<div style={{height: '100%', display: editorDisplay}}>
						<Editor {...editorProps}/>
					</div>
				</div>
			</SplitterPanel>
		</Splitter>
	)
}