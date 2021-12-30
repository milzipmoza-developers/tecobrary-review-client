import React, {ReactElement} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

export interface Props {
  text: string
  disabled?: boolean
  backgroundColor?: string
  to?: string
  onClick?: () => void
}

interface ButtonProps {
  disabled: boolean
  backgroundColor?: string
}

const Wrapper = styled.div<ButtonProps>`
  border-radius: 4px;
  width: fit-content;
  height: 2rem;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "rgba(43, 43, 43)"};
  border: 1px solid rgba(43, 43, 43);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  cursor: ${props => props.disabled ? "disabled" : "pointer"};
`

const Text = styled.div<ButtonProps>`
  margin: 1rem;
  font-weight: bold;
  font-size: small;
  color: ${props => props.disabled ? "rgb(90, 90, 90)" : "rgb(255, 255, 255)"};
  cursor: ${props => props.disabled ? "disabled" : "pointer"};
  height: fit-content;
`

function DefaultButton({text, disabled, backgroundColor, to, onClick}: Props): ReactElement {

  const history = useHistory()

  const onClickAction = () => {
    if (disabled) {
      doNothingOnClick()
      return
    }
    if (onClick) {
      onClick()
      return;
    }
    history.push(`${to}`)
  }

  const doNothingOnClick = () => {
    console.debug("아무것도 하지 않음")
  }

  return (
    <Wrapper className={"noselect"} onClick={onClickAction}
             disabled={disabled ? disabled : false} backgroundColor={backgroundColor}>
      <Text disabled={disabled ? disabled : false}>
        {text}
      </Text>
    </Wrapper>
  )
}

export default DefaultButton