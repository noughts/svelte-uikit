import type { Property } from "csstype"
import type { SvelteComponent, ComponentProps } from 'svelte'

export { default as Scene } from "./Scene.svelte"
export { default as TabView } from "./TabView.svelte"
export { default as MaterialSymbol } from "./MaterialSymbol.svelte"
export { default as NavigationView } from "./NavigationView.svelte"
export { default as VStack } from "./VStack.svelte"
export { default as HStack } from "./HStack.svelte"
export { default as Spacer } from "./Spacer.svelte"
export { default as Text } from "./Text.svelte"


export function createSceneItem<Props extends DefaultProps>(data: SceneItem<Props>): SceneItem<Props> {
	return { component: data.component, props: data.props, transition: data.transition };
}
export function createTabBarItem<Props extends DefaultProps>(data: TabBarItem<Props>): TabBarItem<Props> {
	return { component: data.component, props: data.props, title: data.title, icon: data.icon };
}
export function createNaivationItem<Props extends DefaultProps>(data: NavigationItem<Props>): NavigationItem<Props> {
	return { component: data.component, props: data.props, title: data.title };
}




export type DefaultProps = Record<string, any>;

export type SceneItem<Props extends DefaultProps = any> = {
	component: SvelteUIComponent<Props>
	props: Props;
	transition?: string;
}


export type TabBarItem<Props extends DefaultProps = any> = {
	title: string
	icon: string
	component: SvelteUIComponent<Props>
	props: Props;
}

export type SceneContext = {
	theme: "light" | "dark" | "system";
	tintColor: Property.Color;
	push: <Props extends DefaultProps>(item: SceneItem<Props>) => void;
	pop: () => void;
}

export type NavigationContext = {
	push: <Props extends DefaultProps>(item: NavigationItem<Props>) => void
	pop: () => void;
}




export type NavigationItem<Props extends DefaultProps = any> = {
	title: string;
	component: SvelteUIComponent<Props>
	props: Props;
}

export type SvelteUIComponent<
	Props extends Record<string, any> = any,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponent<Props, Events, Slots>