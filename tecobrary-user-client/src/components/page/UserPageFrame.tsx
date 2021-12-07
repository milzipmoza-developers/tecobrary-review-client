import React, {ReactElement, ReactNode} from "react";
import {TransparentHeader} from "../headers/TransparentHeader";
import {PageFrame} from "./PageFrame";
import ScrollToTop from "../../routes/ScrollToTop";
import Navigation from "../navigation/Navigation";
import styled from "styled-components";

interface Props {
    top?: string
    header?: boolean
    children: ReactNode
}

export const UserPageFrame = ({top, header, children}: Props): ReactElement => {
    return (
        <Background className='background'>
            <Wrapper>
                <ScrollToTop/>
                <PageFrame top={top} header={header}>{children}</PageFrame>
                <Navigation/>
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