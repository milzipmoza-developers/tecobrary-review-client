import {Gauge} from "./Gauge";
import React from "react";
import styled from "styled-components";

interface Item {
  displayName: string,
  displayOrder: number
  count: number
}

interface Props {
  items: Item[]
}

export const ReviewGauges = ({items}: Props) => {

  const total = items.map(it => it.count)
    .reduce((a, b) => a + b)

  const desc = (a: Item, b: Item) => b.displayOrder - a.displayOrder

  const sortedItem = items.sort(desc)

  return (
    <>
      {sortedItem.map((it: Item, index: number) => (
        <div key={index}>
          <Gauge
            name={it.displayName}
            count={it.count}
            total={total}
            color={'rgb(39, 54, 70)'}/>
          {index == sortedItem.length - 1 ? null : <Margin/>}
        </div>
      ))}
    </>
  )
}

const Margin = styled.div`
  width: auto;
  height: 5px;
`