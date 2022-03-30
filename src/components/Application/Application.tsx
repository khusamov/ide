import {useState} from 'react';
import Splitter, {SplitterPanel} from '../../components/Splitter';
import Editor from '../../components/Editor';
import useLocalStorageState, {useObjectLocalStorageState} from '../../hooks/useLocalStorageState';
import execScript from '../../functions/execScript';
import useSplitterProps from './useSplitterProps';
import ApplicationBar, {EButtonName, TMenuClickHandler} from '../ApplicationBar';
import {Grid} from '@mui/material';
import ModuleInfoList, {IModuleInfo} from '../ModuleInfoList';

const MODULE_INFO_LIST_LOCAL_STORAGE_KEY = 'module-info-list';
const EDITOR_VALUE_LOCAL_STORAGE_KEY = 'editor-value';
const SPLITTER_LOCAL_STORAGE_KEY = 'application-splitter';

export default function Application() {
	const [monacoEditorValue, setMonacoEditorValue] = useLocalStorageState(EDITOR_VALUE_LOCAL_STORAGE_KEY)
	const [moduleInfoList, setModuleInfoList] = useObjectLocalStorageState<IModuleInfo[]>(MODULE_INFO_LIST_LOCAL_STORAGE_KEY, [])

	const onRunButtonClick = () => execScript(monacoEditorValue)
	const onNewButtonClick = () => {

	}

	const onMenuClick: TMenuClickHandler = buttonName => {
		switch (buttonName) {
			case EButtonName.New: onNewButtonClick(); break
			case EButtonName.Run: onRunButtonClick(); break
		}
	}

	const [splitterResizeState, setSplitterResizeState] = useState<string>('end')
	const splitterProps = useSplitterProps({
		onResizeStart: () => setSplitterResizeState('start'),
		onResizeEnd: () => setSplitterResizeState('end'),
		stateKey: SPLITTER_LOCAL_STORAGE_KEY
	})

	return (
		<Grid container direction='column' sx={{height: '100%'}}>
			<Grid item>
				<ApplicationBar {...{onMenuClick}}/>
			</Grid>
			<Grid item sx={{flexGrow: 1}}>
				<Splitter {...splitterProps}>
					<SplitterPanel size={20}>
						<div style={{padding: 10}}>
							<ModuleInfoList list={moduleInfoList}/>
						</div>
					</SplitterPanel>
					<SplitterPanel size={80}>
						<Editor
							hidden={splitterResizeState === 'start'}
							onChange={setMonacoEditorValue}
							value={monacoEditorValue}
						/>
					</SplitterPanel>
				</Splitter>
			</Grid>
		</Grid>

	)
}