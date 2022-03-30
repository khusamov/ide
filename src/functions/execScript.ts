export default function execScript(source: string | undefined) {
	if (source) {
		try {
			const code = new Function('', source)
			code()
		} catch (error) {
			if (error instanceof SyntaxError) {
				console.group('Синтаксическая ошибка')
				console.log(error.message)
				console.log(error.stack)
				console.groupEnd()
			}
			throw error
		}
	}
}