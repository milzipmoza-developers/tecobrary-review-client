import React, {ReactElement} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

export interface Props {
  text: string
  to?: string
  onClick?: () => void
}


const Wrapper = styled.div`
  border-radius: 4px;
  width: fit-content;
  height: 2rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 4px;
`

const Text = styled.div`
  margin: 1rem;
  font-weight: bold;
  font-size: small;
  color: #3498db;
  height: fit-content;
`

function DefaultButton({text, to, onClick}: Props): ReactElement {

  const history = useHistory()

  const onClickTo = () => {
    history.push(`${to}`)
  }

  return (
    <Wrapper onClick={onClick ? onClick : onClickTo}>
      <Text>
        {text}
      </Text>
    </Wrapper>
  )
}

export default DefaultButton