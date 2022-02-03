import {TextButton} from "../buttons/TextButton";
import React from "react";
import styled from "styled-components";


interface SelectedAmount {
  value: string
  displayName: string
}

interface Props {
  selectedItem?: SelectedAmount
  placeHolder: string
  initButtonName: string
  onOpen: () => void
  onInit: () => void
}

export const Selector = ({selectedItem, placeHolder, initButtonName, onOpen, onInit}: Props) => {
  return (
    <>
      <SelectWrapper>
        <SelectElement onClick={onOpen}>
          {selectedItem
            ? <SelectedItem>{selectedItem.displayName}</SelectedItem>
            : <Placeholder>{placeHolder}</Placeholder>}
        </SelectElement>
      </SelectWrapper>
      <TextButtonWrapper>
        {selectedItem
          ? <TextButton onClick={onInit}>{initButtonName}</TextButton>
          : null}
      </TextButtonWrapper>
    </>
  )
}


const SelectWrapper = styled.div`
  width: auto;
  height: 3rem;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  cursor: pointer;
`

const TextButtonWrapper = styled.div`
  margin-top: 1rem;
`

const SelectElement = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #ecf0f1;
  }
`

const Placeholder = styled.div`
  color: #7f8c8d;
`

const SelectedItem = styled.div`
  font-size: large;
`