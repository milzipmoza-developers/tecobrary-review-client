import styled from "styled-components";
import React from "react";

interface Props {
  onClick?: () => void
  children: string
}

export const TextButton = ({onClick, children}: Props) => {
  return (
    <SelectInitButton onClick={onClick}>{children}</SelectInitButton>
  )
}

const SelectInitButton = styled.div`
  background-color: black;
  color: white;
  width: fit-content;
  font-size: x-small;
  padding: 4px;
  border-radius: 1rem;
  margin-left: auto;
`