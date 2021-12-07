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

export interface ListElementProps {
  data: ListDataProps[],
}

export interface ListDataProps extends ListPropNameProps {
  propName: string,
  value: string | ReactNode
}

export function findFromData(arr: ListDataProps[], propName: string): ListDataProps | undefined {
  return arr.find(o => o.propName === propName);
}

export function findFromHeader(arr: ListHeaderProps[], propName: string): ListHeaderProps | undefined {
  return arr.find(o => o.propName === propName);
}