import {SelectableTextButton} from "./SelectableTextButton";

interface Props {
  items: string[]
  selects: number[]
  onItemClick: (index: number) => () => void
}

export const SelectableCheckboxTextButtons = (props: Props) => {
  const {items, selects, onItemClick} = props

  return (
    <>{items.map((it: string, index: number) => (
      <SelectableTextButton selected={selects.includes(index)} onClick={onItemClick(index)}>{it}</SelectableTextButton>
    ))}</>
  )
}