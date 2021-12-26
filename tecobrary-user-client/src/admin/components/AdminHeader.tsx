import {ReactElement, ReactNode} from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode
}

export const AdminHeader = ({children}: Props): ReactElement => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  border: 1px solid grey;
  flex-direction: row;
  display: flex;
  padding: 16px;
  box-sizing: border-box;
`