import styled from "styled-components";
import {ReactNode} from "react";

interface IColorCodeProps {
  background: string,
  color: string
}

export const ColorCodeContainer = styled.div<IColorCodeProps>`
  background: ${props => props.background ? props.background : 'white'};
  color: ${props => props.color ? props.color : 'black'};
  width: fit-content;
  padding: 8px;
  border-radius: 8px;
`

export const colorCodeToReactNode = (colorCode: string): ReactNode => (
  <ColorCodeContainer background={colorCode} color={invertColor(colorCode)}>{colorCode}</ColorCodeContainer>
)

function invertColor(hex: string) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16)
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16)
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str: string, len?: number) {
  len = len || 2;
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}