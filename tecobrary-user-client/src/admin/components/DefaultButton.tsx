import React, {ReactElement, useEffect, useState} from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";

export interface Props {
  text: string
  disabled?: boolean
  to?: string
  onClick?: () => void
}

interface DisableableProps {
  disabled: boolean
}

const Wrapper = styled.div<DisableableProps>`
  border-radius: 4px;
  width: fit-content;
  height: 2rem;
  background-color: rgba(43, 43, 43);
  border: 1px solid rgba(43, 43, 43);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  cursor: ${props => props.disabled ? "disabled" : "pointer"};
`

const Text = styled.div<DisableableProps>`
  margin: 1rem;
  font-weight: bold;
  font-size: small;
  color: ${props => props.disabled ? "rgb(90, 90, 90)" : "rgb(255, 255, 255)"};
  cursor: default;
  height: fit-content;
`

function DefaultButton({text, disabled, to, onClick}: Props): ReactElement {

  const [buttonDisabled, setButtonDisabled] = useState(disabled)

  useEffect(() => {
    if (disabled == undefined) {
      return
    }
    setButtonDisabled(!disabled)
  }, [disabled])

  const history = useHistory()

  const onClickAction = () => {
    if (buttonDisabled) {
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
             disabled={buttonDisabled ? buttonDisabled : false}>
      <Text disabled={buttonDisabled ? buttonDisabled : false}>
        {text}
      </Text>
    </Wrapper>
  )
}

export default DefaultButton