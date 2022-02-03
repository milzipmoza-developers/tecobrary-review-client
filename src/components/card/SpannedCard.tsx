import {ReactElement, ReactNode} from "react";
import styled from "styled-components";

interface Props {
  title?: string
  padding?: string
  children: ReactNode
}

function SpannedCard({title, padding, children}: Props): ReactElement {
  return (
    <Wrapper padding={padding}>
      {title ? <Header>
        <Title>{title}</Title>
      </Header> : null}
      {children}
    </Wrapper>
  )
}

export default SpannedCard

interface WrapperProps {
  padding?: string
}

const Wrapper = styled.div<WrapperProps>`
  background-color: white;
  color: black;
  border-radius: 2rem 0 0 2rem;
  width: auto;
  margin-left: 1rem;
  height: fit-content;
  padding: ${props => props.padding ?? undefined};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const Header = styled.div`
  margin-bottom: 1.5rem;
`

const Title = styled.div`
  font-size: large;
  font-weight: bold;
`
