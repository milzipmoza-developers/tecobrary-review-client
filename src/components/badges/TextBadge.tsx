import React, {ReactElement} from "react";
import styled from "styled-components";

interface Props {
  max: number
  percent: number
  children: string
}

export const TextBadge = ({max, percent, children}: Props): ReactElement => {
  return (
    <TextIcon transparency={percent / max}>
      <TextIconText color={(() => {
        const ratio = percent / max;
        if (ratio > 0.4) {
          return 'white'
        }
        return 'black'
      })()}>{children}</TextIconText>
    </TextIcon>
  )
}

interface TextIconProps {
  transparency: number
}

const TextIcon = styled.div<TextIconProps>`
  background: rgb(39, 54, 60, ${props => props.transparency});
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 4px;
  cursor: pointer;
`

interface TextIconTextProps {
  color?: string
}

const TextIconText = styled.div<TextIconTextProps>`
  color: ${props => props.color ?? 'white'};
  font-size: medium;
  width: max-content;
`