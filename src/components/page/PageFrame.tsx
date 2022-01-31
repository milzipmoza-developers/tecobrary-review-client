import React, {ReactElement, ReactNode} from "react";
import {TransparentHeader} from "../headers/TransparentHeader";
import styled from "styled-components";

interface Props {
  top?: string
  header: HeaderProps
  children: ReactNode
}

interface HeaderProps {
  useBackButton: boolean
  useProfileButton: boolean
}

export const PageFrame = ({top, header, children}: Props): ReactElement => {
  const {useBackButton, useProfileButton} = header

  return (
    <Wrapper id="page-frame">
      <TransparentHeader useBackButton={useBackButton} useProfileButton={useProfileButton}/>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: auto;
  height: fit-content;
  min-height: 85vh;
  background-color: #ecf0f1;
  position: relative;
  padding-top: 14vh;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
`

const ChildrenWrapper = styled.div`
  //position: fixed;
`