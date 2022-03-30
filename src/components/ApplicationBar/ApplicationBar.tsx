import {MouseEvent, ReactNode} from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from '@mui/material';
import SourceIcon from '@mui/icons-material/Source'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import ArticleIcon from '@mui/icons-material/Article'
import ListAltIcon from '@mui/icons-material/ListAlt'
import {Theme} from '@mui/material/styles'
import {SxProps} from '@mui/system'

export enum EButtonName {
	New = 'new',
	Run = 'run',
	Compile = 'compile'
}

interface IButton {
	name: EButtonName,
	title: string,
	icon?: ReactNode
}

const buttons: IButton[] = [{
	name: EButtonName.New,
	title: 'Новый модуль',
	icon: <ArticleIcon/>
}, {
	name: EButtonName.Run,
	title: 'Выполнить код',
	icon: <DirectionsRunIcon/>
}, {
	name: EButtonName.Compile,
	title: 'Скомпилировать',
	icon: <ListAltIcon/>
}]

const buttonStyle: SxProps<Theme> = {
	color: 'white',
	paddingLeft: 2,
	paddingRight: 2
}

export type TMenuClickHandler = (buttonName: EButtonName) => void

interface IApplicationBarProps {
	onMenuClick?: TMenuClickHandler
}

export default function ApplicationBar({onMenuClick}: IApplicationBarProps) {
	const onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		const buttonName = (event.relatedTarget as HTMLButtonElement).getAttribute('data-name')
		if (!buttonName) throw new Error('Не задано имя кнопки меню')
		onMenuClick && onMenuClick(buttonName as EButtonName)
	}

	return (
		<AppBar position='static'>
			<Toolbar variant='dense'>
				<SourceIcon/>
				<Box sx={{width: 10}}/>
				<Typography variant='h6' sx={{textTransform: 'uppercase'}}>
					Изюминка
				</Typography>
				<Box sx={{width: 24}}/>
				{buttons.map(({name, icon, title}, index) => (
					<Button key={index} startIcon={icon} sx={buttonStyle} data-name={name} onClick={onButtonClick}>
						{title}
					</Button>
				))}
			</Toolbar>
		</AppBar>
	)
}