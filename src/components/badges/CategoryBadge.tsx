import {ReactElement} from "react";
import styled from "styled-components";
import {Property} from "csstype";

interface Props {
  size?: 'small' | 'medium'
  fontWeight?: Property.FontWeight
  backgroundColor: string
  children: string
}

const selectableSize = {
  small: {
    fontSize: 'x-small',
  },
  medium: {
    fontSize: 'small'
  }
}

function getSize(size: string) {
  if (size === 'small') {
    return selectableSize.small
  }
  if (size === 'medium') {
    return selectableSize.medium
  }
  return undefined
}

export const CategoryBadge = ({size, fontWeight, backgroundColor, children}: Props): ReactElement => {

  const badgeSize: string = size ? size : 'medium'

  return (
    <Wrapper style={{backgroundColor: backgroundColor}}>
      <BadgeText style={{fontWeight, ...getSize(badgeSize)}} color={choiceFontColor(backgroundColor)}>
        {children}
      </BadgeText>
    </Wrapper>
  )
}

const Wrapper = styled.span`
  height: fit-content;
  width: fit-content;
  padding: 2px 4px 2px 4px;
  margin: 0 4px 0 4px;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface TextProps {
  color: string
}

const BadgeText = styled.a<TextProps>`
  width: fit-content;
  height: fit-content;
  font-size: small;
  color: ${props => props.color};
`

function choiceFontColor(hex: string) {
  const c = hex.substring(1)
  const rgb = parseInt(c, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return luma < 127.5 ? "white" : "black"
}