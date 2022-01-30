import React, {ReactElement} from "react";
import styled from "styled-components";
import {AddReviewIcon} from "../icons/AddReviewIcon";
import {NavigationIcon} from "./NavigationIcon";

const NavigationWrapper = styled.div`
  height: 4rem;
  width: 100%;
  position: fixed;
  bottom: 0px;
  max-width: 36rem;
  border-radius: 2rem 2rem 0 0;
  background-color: #ecf0f1;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`

const NavigationContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: fit-content;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`

function Navigation(): ReactElement {

  return (
    <NavigationWrapper>
      <NavigationContent>
        <NavigationIcon name='home' width={'1.5rem'} height={'1.5rem'} to='/'/>
        <NavigationIcon name='reader' width={'1.5rem'} height={'1.5rem'} to='/timeline'/>
        <AddReviewIcon to='/review'/>
      </NavigationContent>
    </NavigationWrapper>
  );
}

export default Navigation;