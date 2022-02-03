import {SelectableTextButton} from "./SelectableTextButton";

interface Props {
  items: string[]
  selected: number
  onItemClick: (index: number) => () => void
}

export const SelectableRadioTextButtons = (props: Props) => {
  const {items, selected, onItemClick} = props

  return (
    <>{items.map((it: string, index: number) => (
      <SelectableTextButton selected={index == selected} onClick={onItemClick(index)}>{it}</SelectableTextButton>
    ))}</>
  )
}