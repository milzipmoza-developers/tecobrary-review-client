import React, {ReactElement} from "react";
import styled from "styled-components";

interface Props {
  selected: boolean
  onClick: () => void
  children: string
}

export const SelectableTextButton = ({selected, onClick, children}: Props): ReactElement => {
  if (!selected) {
    return (
      <UnSelectedTextIcon onClick={onClick}>
        <UnSelectedTextIconText>{children}</UnSelectedTextIconText>
      </UnSelectedTextIcon>
    )
  }

  return (
    <TextIcon onClick={onClick}>
      <TextIconText>{children}</TextIconText>
    </TextIcon>
  )
}

const TextIcon = styled.div`
  background: rgb(39, 54, 60);
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 4px;
  border: 1px solid rgb(39, 54, 60);
  cursor: pointer;
`

const UnSelectedTextIcon = styled.div`
  background: white;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 4px;
  border: 1px dashed rgb(39, 54, 60);
  cursor: pointer;
`

const TextIconText = styled.div`
  color: white;
  font-size: medium;
  width: max-content;
`
const UnSelectedTextIconText = styled.div`
  color: rgb(39, 54, 60);
  font-size: medium;
  width: max-content;
`