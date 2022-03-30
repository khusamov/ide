import {RefObject, useRef} from 'react';
import {Property} from 'csstype';
import useResizeHide from '../../hooks/useResizeHide';

export type TEditorWrapRef = RefObject<HTMLDivElement>
export type TDisplay = Property.Display

const HIDE: TDisplay = 'none'
const SHOW: TDisplay = 'block'

/**
 * Принятие решения о скрытии или показе редактора в зависимости от двух условий:
 * 1) изменение размеров wrap-элемента редактора
 * 2) или внешнего указания о скрытии редактора
 * @param hidden Внешнее указание о скрытии редактора.
 */
export default function useEditorDisplay(hidden: boolean): [TEditorWrapRef, TDisplay] {
	const editorWrapRef = useRef<HTMLDivElement>(null)
	const [isEditorWrapResize] = useResizeHide(editorWrapRef)
	const editorDisplay = isEditorWrapResize || hidden ? HIDE : SHOW
	return [editorWrapRef, editorDisplay]
}