import React, {ReactElement, ReactNode} from "react";
import {PageFrame} from "./PageFrame";
import ScrollToTop from "../../routes/ScrollToTop";
import Navigation from "../navigation/Navigation";
import styled from "styled-components";
import UnderPopModal from "../modal/UnderPopModal";
import Pop from "../pop/Pop";

interface Props {
  top?: string
  header?: HeaderProps
  children: ReactNode
}

interface HeaderProps {
  useBackButton: boolean
  useProfileButton: boolean
}

export const UserPageFrame = ({top, header, children}: Props): ReactElement => {

  return (
    <Background className='background'>
      <Wrapper id='user-page-frame-wrapper'>
        <ScrollToTop/>
        <PageFrame top={top}
                   header={header ? {...header} : {useBackButton: true, useProfileButton: false}}>{children}</PageFrame>
        <Navigation/>
        <UnderPopModal/>
        <Pop/>
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