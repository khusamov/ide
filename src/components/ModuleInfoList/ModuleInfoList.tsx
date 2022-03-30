import {MouseEvent} from 'react';
import {Button, Grid} from '@mui/material';

export interface IModuleInfo {
	title: string
}

interface IModuleNameListProps {
	list: IModuleInfo[]
	active?: IModuleInfo
}

export default function ModuleInfoList({list, active}: IModuleNameListProps) {
	const onClick = (event: MouseEvent<HTMLDivElement>) => {
		const id = (event.target as HTMLDivElement).getAttribute('data-id')
	}

	return(
		<Grid container spacing={1} {...{onClick}}>
			{list.map((module, index) => (
				<Grid key={index} item>
					<Button data-id={module.title} disabled={module.title === active?.title}>
						{module.title}
					</Button>
				</Grid>
			))}
		</Grid>
	)
}