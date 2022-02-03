import {ReactElement} from "react";
import styled from "styled-components";

interface Props {
  itemName: string
  disabled: boolean
  onClick: () => void
}

export const SelectorElement = ({itemName, disabled, onClick}: Props): ReactElement => {
  if (disabled) {
    return (
      <DisabledWrapper>
        <DisabledText>{itemName}</DisabledText>
      </DisabledWrapper>
    )
  }

  return (
    <Wrapper onClick={onClick}>
      <Text>{itemName}</Text>
    </Wrapper>
  )
}

const DisabledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
`

const DisabledText = styled.div`
  font-size: large;
  color: grey;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  cursor: pointer;

  &:hover {
    background-color: #ecf0f1;
    font-weight: bold;
  }
`

const Text = styled.div`
  font-size: large;
`
