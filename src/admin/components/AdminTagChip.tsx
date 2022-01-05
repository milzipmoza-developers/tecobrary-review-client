import {ReactElement} from "react";
import styled from "styled-components";

interface Props {
  backgroundColor: string
  children: string
}

const AdminTagChip = ({backgroundColor, children}: Props): ReactElement => {
  return (
    <Wrapper color={choiceFontColor(backgroundColor)} background={backgroundColor}>
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
  padding: 4px 1rem;
  margin: 2px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const Text = styled.div`
  font-size: large;
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