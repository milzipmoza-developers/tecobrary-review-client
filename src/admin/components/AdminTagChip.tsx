import {ReactElement} from "react";
import styled from "styled-components";

interface Props {
  color: string
  children: string
}

const AdminTagChip = ({color, children}: Props): ReactElement => {
  return (
    <Wrapper color={color} background={invertColor(color)}>
      <Text>{children}</Text>
    </Wrapper>
  )
}

export default AdminTagChip

interface WrapperProps {
  background?: string
  color: string
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  background: ${props => props.background ? props.background : 'white'};
  color: ${props => props.color ? props.color : 'black'};
  min-width: 4rem;
  padding: 2px 1rem;
  margin: 2px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

const Text = styled.div`
  font-size: large;
`

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