import {SelectableTextButton} from "./SelectableTextButton";
import {ReactElement} from "react";

interface Props {
  items: string[]
  selects: number[]
  onItemClick: (index: number) => () => void
}

export const SelectableCheckboxTextButtons = (props: Props): ReactElement => {
  const {items, selects, onItemClick} = props

  return (
    <>{items.map((it: string, index: number) => (
      <SelectableTextButton key={index} selected={selects.includes(index)}
                            onClick={onItemClick(index)}>{it}</SelectableTextButton>
    ))}</>
  )
}