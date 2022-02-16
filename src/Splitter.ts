import {SyntheticEvent, ReactNode} from 'react'
import {Splitter, SplitterProps, SplitterResizeEndParams} from 'primereact/splitter'
import './Splitter.css'

export {SplitterPanel} from 'primereact/splitter'

/**
 * Опции расширенного Splitter.
 */
interface MySplitterProps extends SplitterProps {
	onResizeStart?(e: SplitterResizeEndParams): void
	children?: ReactNode | undefined;
}

declare module 'primereact/splitter' {
	/**
	 * В исходном описании компонента Splitter не хватает некоторых деталей.
	 * В этом слиянии интерфейсов они добавлены.
	 */
	export interface Splitter {
		props: MySplitterProps
		panelSizes: number[]
		new(props: MySplitterProps, context: any): Splitter
		onResizeStart(event: SyntheticEvent, index: number): void
	}
}

/**
 * В компонент Splitter добавлена опция onResizeStart.
 * @link https://www.primefaces.org/primereact/splitter/
 */
class MySplitter extends Splitter {
	onResizeStart(event: SyntheticEvent, index: number) {
		if (this.props.onResizeStart) {
			this.props.onResizeStart({
				originalEvent: event,
				sizes: this.panelSizes
			})
		}

		super.onResizeStart(event, index)
	}
}

export {MySplitter as Splitter}
export type {MySplitterProps as SplitterProps}