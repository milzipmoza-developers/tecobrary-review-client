import React, {ReactElement, ReactNode} from "react";
import {TransparentHeader} from "../headers/TransparentHeader";
import styled from "styled-components";

interface Props {
  header: HeaderProps
  children: ReactNode
}

interface HeaderProps {
  useBackButton: boolean
  useProfileButton: boolean
}

export const PageFrame = ({header, children}: Props): ReactElement => {
  const {useBackButton, useProfileButton} = header

  return (
    <Wrapper id="page-frame">
      <TransparentHeader useBackButton={useBackButton} useProfileButton={useProfileButton}/>
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
      <BottomSafetyArea/>
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
  display: flex;
  flex-direction: column;
`

const ChildrenWrapper = styled.div`
  //position: fixed;
`

const BottomSafetyArea = styled.div`
  height: 5rem;
  width: auto;
`