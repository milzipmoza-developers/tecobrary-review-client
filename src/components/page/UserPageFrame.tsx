import React, {ReactElement, ReactNode} from "react";
import {PageFrame} from "./PageFrame";
import ScrollToTop from "../../routes/ScrollToTop";
import Navigation from "../navigation/Navigation";
import styled from "styled-components";
import UnderPopModal from "../modal/UnderPopModal";

interface Props {
  top?: string
  userHeaderBackButton?: boolean
  children: ReactNode
}

export const UserPageFrame = ({top, userHeaderBackButton, children}: Props): ReactElement => {

  return (
    <Background className='background'>
      <Wrapper id='user-page-frame'>
        <ScrollToTop/>
        <PageFrame top={top} useHeaderBackButton={userHeaderBackButton}>{children}</PageFrame>
        <Navigation/>
        <UnderPopModal/>
      </Wrapper>
    </Background>
  )
}

const Background = styled.div`
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  overflow: hidden;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
  max-width: 36rem;
`;