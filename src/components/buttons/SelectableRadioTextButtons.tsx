import {SelectableTextButton} from "./SelectableTextButton";
import {ReactElement} from "react";

interface Props {
  items: string[]
  selected?: number
  onItemClick: (index: number) => () => void
}

export const SelectableRadioTextButtons = (props: Props): ReactElement => {
  const {items, selected, onItemClick} = props

  return (
    <>{items.map((it: string, index: number) => (
      <SelectableTextButton key={index} selected={index == selected}
                            onClick={onItemClick(index)}>{it}</SelectableTextButton>
    ))}</>
  )
}