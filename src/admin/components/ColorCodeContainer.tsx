import styled from "styled-components";
import {ReactNode} from "react";

interface IColorCodeProps {
  background: string,
  color: string
}

export const ColorCodeWrapper = styled.div<IColorCodeProps>`
  background: ${props => props.background ? props.background : 'white'};
  color: ${props => props.color ? props.color : 'black'};
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

export const colorCodeContainer = (colorCode: string): ReactNode => (
  <ColorCodeWrapper background={colorCode} color={choiceFontColor(colorCode)}>{colorCode}</ColorCodeWrapper>
)

function choiceFontColor(hex: string) {
  const c = hex.substring(1)
  const rgb = parseInt(c, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return luma < 127.5 ? "white" : "black"
}