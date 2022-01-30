import React, {ReactElement} from "react";
import {Home, Person, PersonCircle, Reader} from "react-ionicons";
import styled from "styled-components";
import {useHistory, useLocation} from "react-router-dom";

export type iconType = "home" | "reader" | "person" | "not-logged-in"

interface Props {
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

export const NavigationIcon = ({name, height, width, to, onClick}: Props): ReactElement => {
  const history = useHistory();
  const location = useLocation();

  const color: string = location.pathname == to ? iconColor.selected : iconColor.unselected

  const _onClick = () => {
    if (!to) {
      return
    }
    if (location.pathname == to) {
      return
    }
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