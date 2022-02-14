import React, {useRef, useState} from 'react';
import Editor, {OnChange} from '@monaco-editor/react';
import useResizeHide from './hooks/useResizeHide';
import {Splitter, SplitterPanel} from './Splitter.jsx';

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

	return (
		<Splitter
			style={{height: '100%'}}
			onResizeStart={onResizeStart}
			onResizeEnd={onResizeEnd}
			stateKey={"mykey"}
			stateStorage={"local"}
		>
			<SplitterPanel>
				Panel 1
			</SplitterPanel>
			<SplitterPanel style={{paddingLeft: 50}}>
				<div ref={editorWrapRef} style={{height: '100%', overflow: 'hidden'}}>
					<div style={{height: '100%', display: editorDisplay}}>
						<Editor
							width='100%'
							height='100%'
							loading='Загрузка редактора...'
							language='typescript'
							value={codeSourceText}
							onChange={onEditorChange}
							options={{minimap: {enabled: false}}}
						/>
					</div>
				</div>
			</SplitterPanel>
		</Splitter>
	)
}