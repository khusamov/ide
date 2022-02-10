import React, {useRef, useState} from 'react';
import Editor, {OnChange} from '@monaco-editor/react';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import useResizeHide from './hooks/useResizeHide';

export default function VariableWidthGrid() {
	const editorWrapRef = useRef<HTMLDivElement>(null)

	const [codeSourceText, setCodeSourceText] = useState<string | undefined>()
	const [editorHidden] = useResizeHide(editorWrapRef)

	const onEditorChange: OnChange = value => setCodeSourceText(value)

	return (
		<Box sx={{flexGrow: 1, height: '100%'}}>
			<Grid container sx={{height: '100%'}} alignItems='stretch'>
				<Grid item xs={3} sx={{margin: 10, border: '1px solid silver'}}>
					Содержимое левой колонки.
				</Grid>
				<Grid ref={editorWrapRef} item xs sx={{margin: 10, border: '1px solid silver'}}>
					{!editorHidden && (
						<Editor
							width='100%'
							height='100%'
							loading='Загрузка редактора...'
							language='typescript'
							value={codeSourceText}
							onChange={onEditorChange}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}
