import {OnChange} from '@monaco-editor/react';

export default interface IEditorProps {
	hidden: boolean
	value?: string
	onChange?: OnChange
}