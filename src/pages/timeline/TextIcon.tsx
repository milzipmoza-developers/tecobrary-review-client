import React from "react";
import styled from "styled-components";

interface Props {
  children: string
}

export const TextIcon = ({children}: Props) => (
  <Wrapper>
    <Text>{children}</Text>
  </Wrapper>
);


const Wrapper = styled.div`
  background: rgb(39, 54, 60);
  padding: 2px 6px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 4px;
  border: 1px solid rgb(39, 54, 60);
  width: fit-content;
  height: 24px;
`

const Text = styled.div`
  color: white;
  font-size: medium;
  width: max-content;
`