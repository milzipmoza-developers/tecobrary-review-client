import React, {ReactElement} from "react";
import {Home, Person, PersonCircle, Reader} from "react-ionicons";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {navigationState} from "../../states/Navigation";
import {useHistory} from "react-router-dom";

export type iconType = "home" | "reader" | "person" | "not-logged-in"

interface Props {
  index: number
  name: iconType
  height: string
  width: string
  to?: string,
  onClick?: () => void
}

const iconColor = {
  selected: "#000000",
  unselected: "#7f8c8d"
}

const NavElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
`

export const NavigationIcon = ({index, name, height, width, to, onClick}: Props): ReactElement => {
  const [navigation, setNavigationState] = useRecoilState(navigationState);
  const history = useHistory();

  const color: string = navigation.selected == index ? iconColor.selected : iconColor.unselected

  const _onClick = () => {
    if (!to) {
      return
    }
    if (navigation.selected == index) {
      return
    }
    console.log('navigation selected', index) // todo: remove
    setNavigationState({selected: index})
    history.push(to)
  }

  const CustomIonicon = () => {
    if (name === "home") {
      return <Home width={width} height={height} color={color}/>
    }
    if (name === "reader") {
      return <Reader width={width} height={height} color={color}/>
    }
    if (name === "not-logged-in") {
      return <PersonCircle width={width} height={height} color={color}/>
    }
    if (name === "person") {
      return <Person width={width} height={height} color={color}/>
    }
    return null
  }

  return (
    <NavElement onClick={onClick ? onClick : _onClick}>
      <CustomIonicon/>
    </NavElement>
  )
}