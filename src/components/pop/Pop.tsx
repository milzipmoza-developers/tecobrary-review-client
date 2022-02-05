import React, {ReactElement, useEffect} from "react";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {parse, popState} from "../../states/Pop";


const box_active = {
  transition: "opacity 300ms",
};

const box_hidden = {
  opacity: "0",
  visibility: "hidden",
  transition: "opacity 300ms, visibility 300ms",
};

const Pop = (): ReactElement => {

  const [pop, setPop] = useRecoilState(popState)

  useEffect(() => {
    if (pop.duration == 0) {
      return
    }
    if (pop.open) {
      setTimeout(() => {
        setPop((oldValue) => ({
          ...oldValue,
          open: false
        }))
      }, pop.duration)
    }
  }, [pop])

  return (
    <PopArea style={pop.open ? box_active : box_hidden}>
      <PopWrapper background={parse(pop.color).box}>
        <PopMessage>{pop.message}</PopMessage>
        {pop.actionButton ?
          <PopAction onClick={pop.actionButton.onClick}>{pop.actionButton.name}</PopAction> : null}
      </PopWrapper>
    </PopArea>
  )
}

export default Pop

const PopArea = styled.div`
  width: 100%;
  max-width: 36rem;
  height: 6rem;
  position: fixed;
  bottom: 4rem;
  z-index: 1000;
`

interface PopWrapperProps {
  background: string
}

const PopWrapper = styled.div<PopWrapperProps>`
  background: ${props => props.background};
  margin: 1rem;
  padding: 1rem;
  height: fit-content;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`

const PopMessage = styled.div`
  flex: 9;
  margin-right: 1rem;
`

const PopAction = styled.div`
  flex: 1;
  margin-left: auto;
  justify-self: baseline;
  border-radius: 4px;
  font-size: small;
  display: flex;
  justify-content: center;
  background: rgb(255, 255, 255);
`