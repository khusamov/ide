import {SplitterProps} from '../Splitter';

export default function useSplitterProps(props: SplitterProps): SplitterProps {
	return {
		style: {
			height: '100%',
			border: 'none'
		},
		stateStorage: 'local',
		...props
	}
}