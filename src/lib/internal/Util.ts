import type { Properties } from 'csstype';
import { tweened, type Subscriber, type TweenedOptions } from 'svelte/motion';

export function styleToString(style: Properties) {
	const ary: string[] = [];
	Object.entries(style).forEach(([key, value]) => {
		ary.push(`${addMinus(camelToKebab(key))}:${value};`);
	});
	return ary.join(' ');
}

function camelToKebab(input: string): string {
	return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
function addMinus(input: string): string {
	if (input.startsWith("webkit")) {
		return "-" + input;
	}
	return input;
}

export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}


export async function tween<T>(from: T, to: T, options: TweenedOptions<T>, run: Subscriber<T>) {
	const t = tweened<T>(from, options);
	const unsubscribe = t.subscribe(run);
	await t.set(to);
	unsubscribe();
}

export function waitForEvent(target: any, eventName: string) {
	return new Promise(resolve => {
		function handleEvent(event: Event) {
			target.removeEventListener(eventName, handleEvent); // 一度のみ発火させるためイベントリスナーを削除
			resolve(event);
		}
		target.addEventListener(eventName, handleEvent);
	});
}

export function waitForNextFrame() {
	return new Promise((resolve) => {
		let count = 0;
		function handleEvent(event: Event) {
			count++;
			if (count > 1) {
				removeEventListener("onEnterFrame", handleEvent); // 一度のみ発火させるためイベントリスナーを削除
				resolve(event);
			}
		}
		addEventListener("onEnterFrame", handleEvent);
	});
}