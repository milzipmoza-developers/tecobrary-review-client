import {ReactElement, useState} from "react";
import {TextBadge} from "./TextBadge";

interface Item {
  name: string
  count: number
}

interface Props {
  items: Item[]
}

export const SortedTextBadges = (props: Props): ReactElement => {
  const {items} = props

  const [total] = useState(items.map(it => it.count)
    .reduce((a, b) => a + b))

  const calculatePercent = (count: number): number => {
    return Math.round((count / total) * 100)
  }

  const sortedItem = items.sort((a, b) => b.count - a.count)

  const maxCount = sortedItem[0]?.count ?? 0

  return (
    <>{sortedItem.map((it: Item, index: number) => {
      const percent = calculatePercent(it.count);
      return (
        <TextBadge key={index}
                   percent={percent}
                   max={calculatePercent(maxCount)}>
          {`${it.name} (${percent}%)`}
        </TextBadge>
      );
    })}</>
  )
}