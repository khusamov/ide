import {RefObject, useEffect, useState} from 'react';
import {debounceTime, Observable, throttleTime} from 'rxjs';

function createResizeObservable<T extends Element>(div: T) {
	return new Observable<ResizeObserverEntry[]>(
		subscriber => {
			const resize = new ResizeObserver(subscriber.next.bind(subscriber))
			resize.observe(div)
			return () => {
				console.log('resize.disconnect')
				resize.disconnect()
			}
		}
	)
}

const DUE_AND_DURATION_TIME = 200;

/**
 * Специальный хук для скрытия определенного элемента во время изменения размеров.
 * @param ref Ссылка на объект, за чьими размерами требуется следить.
 * @link https://rxjs.dev/api/operators/debounceTime
 * @link https://rxjs.dev/api/operators/throttleTime
 */
export default function useResizeHide<T extends Element>(ref: RefObject<T>): [boolean] {
	const [hidden, setHidden] = useState(false);
	useEffect(
		() => {
			if (ref.current) {
				const observable = createResizeObservable(ref.current)
				const endSubscription = (
					observable
						.pipe(debounceTime(DUE_AND_DURATION_TIME))
						.subscribe({next: () => {
								setHidden(false)
								console.log('Конец')
							}})
				)
				const beginSubscription = (
					observable
						.pipe(throttleTime(DUE_AND_DURATION_TIME))
						.subscribe({next: () => {
								setHidden(true)
								console.log('Начало')
							}})
				)
				return () => {
					console.log('subscription.unsubscribe')
					endSubscription.unsubscribe()
					beginSubscription.unsubscribe()
				}
			}
		},
		[]
	)
	return [hidden];
}