import {ReactNode} from "react";

export interface ListFlexProps {
  flex: number,
}

export interface ListPropNameProps {
  propName: string
}

export interface ListHeaderProps extends ListFlexProps, ListPropNameProps {
  flex: number,
  name: string,
  propName: string
}

export interface Element {
  [key: string]: string | ReactNode
}

export interface ListElementProps {
  data: Element[],
}

export function getFromHeader(arr: ListHeaderProps[], propName: string): ListHeaderProps | undefined {
  return arr.find(o => o.propName === propName);
}

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName]; // o[propertyName] is of type T[K]
}