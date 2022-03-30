import {useState} from 'react';


// TODO https://www.freecodecamp.org/news/react-hooks-your-next-project-needs/
// npm install @mantine/hooks
// Взять оттуда useLocalStorageValue

type TValue = string | undefined
type TResult = [TValue, (value: TValue) => void]

/**
 * Хранение состояния в текстовом виде в LocalStorage браузера.
 * @param localStorageKey
 */
export default function useLocalStorageState(localStorageKey: string): TResult {
	const initialState = localStorage.getItem(localStorageKey)
	const [value, setValue] = useState<TValue>(initialState === null ? undefined : initialState)

	const setLocalStorageValue = (value: TValue) => {
		value = value ? value : ''
		setValue(value)
		localStorage.setItem(localStorageKey, value)
	}

	return [value, setLocalStorageValue]
}

type TObject = {[key: string]: any}
type TObjectValue<T extends TObject> = T | undefined
type TObjectResult<T extends TObject> = [T, (value: T) => void]

/**
 * Хранение состояния в объектном виде в LocalStorage браузера.
 * @param localStorageKey
 * @param initialState
 */
export function useObjectLocalStorageState<T extends TObject>(localStorageKey: string, initialState: T): TObjectResult<T> {
	const [value, setValue] = useState<T>(initialState)

	if (initialState && localStorageKey in localStorage) {
		let rawValue = localStorage.getItem(localStorageKey)
		if (!rawValue) {
			throw new Error('Значение не найдено')
		}

		let _value: T
		try {
			_value = JSON.parse(rawValue)
			setValue(_value)
		} catch (error) {
			console.error('Ошибка обработки ключа ' + localStorageKey)
			console.error('Значение: ' + initialState)
			console.error('Исходная ошибка', error)
		}



	} else {
		localStorage.setItem(localStorageKey, JSON.stringify(initialState))
	}


	const setLocalStorageValue = (value: T) => {
		setValue(value)
		localStorage.setItem(localStorageKey, JSON.stringify(value))
	}

	return [value, setLocalStorageValue]
}