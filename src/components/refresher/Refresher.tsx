import React, {ReactElement} from "react";
import {RefreshCircle} from "react-ionicons";
import styled from "styled-components";

interface Props {
  title: string
  show: boolean
  onClick: () => void
}

export const Refresher = (props: Props): ReactElement => {
  const {title, show, onClick} = props;

  return (
    <Wrapper onClick={onClick} style={show ? boxActive : boxHidden}>
      <RefresherTitle>
        <div style={{marginRight: "4px"}}>{title}</div>
        <div style={{height: "22px", width: "22px"}}>
          <RefreshCircle color={"white"}/>
        </div>
      </RefresherTitle>
    </Wrapper>
  )
}

const boxActive = {
  transition: "top 500ms",
};

const boxHidden = {
  top: "-50px",
  transition: "top 500ms",
};

const Wrapper = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: rgb(36, 100, 224);
  color: white;
  z-index: 200;
  border-radius: 20px;
`

const RefresherTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`