import {ReactElement} from "react";
import {Add} from "react-ionicons";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import ReactGA from 'react-ga';

interface Props {
  to: string
}

export const AddReviewIcon = ({to}: Props): ReactElement => {
  const history = useHistory()

  const onClick = () => {
    ReactGA.event({
      category: "Button",
      action: "go to review add page",
      label: "review",
    })

    const pathName = history.location.pathname

    if (pathName.startsWith("/books")) {
      const isbn = pathName.replace("/books", "")
        .replace("/", "");
      history.push(`/reviews?isbn=${isbn}`)
      return
    }

    history.push(to)
  }

  return (
    <NavElement onClick={onClick}>
      <Add color='white' width='2rem' height='2rem'/>
    </NavElement>
  )
}

const NavElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #2c3e50;
  cursor: pointer;
`
