import {SyntheticEvent, ReactNode} from 'react'
import {Splitter, SplitterProps, SplitterResizeEndParams} from 'primereact/splitter'
export {SplitterPanel} from 'primereact/splitter'

interface MySplitterProps extends SplitterProps {
	onResizeStart?(e: SplitterResizeEndParams): void
	children?: ReactNode | undefined;
}

declare module 'primereact/splitter' {
	export interface Splitter {
		props: MySplitterProps
		new(props: MySplitterProps, context: any): Splitter
		onResizeStart(event: SyntheticEvent, index: number): void
		panelSizes: number[]
	}
}

class MySplitter extends Splitter {
	constructor(props: MySplitterProps, context: any) {
		super(props, context)
	}

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