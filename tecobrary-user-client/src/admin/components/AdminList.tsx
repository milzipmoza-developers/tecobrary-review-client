import {ReactElement, ReactNode, useState} from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";

interface Props {
  title: string
  children: ReactNode
}

export const AdminList = ({title, children}: Props): ReactElement => {

  const [page, setPage] = useState(1)
  const [isFirst, setIsFirst] = useState(true)
  const [isLast, setIsLast] = useState(false)

  const pageUp = () => {
    if (isLast) {
      return
    }
    if (isFirst) {
      setIsFirst(false)
    }
    setPage(page + 1)
  }

  const pageDown = () => {
    if (isFirst) {
      return
    }
    if (page > 1) {
      setPage(page - 1)
      if (page == 2) {
        setIsFirst(true)
      }
      return;
    }
  }

  return (
    <div>
      <HeaderWrapper>
        <HeaderText>{title}</HeaderText>
      </HeaderWrapper>
      <BodyWrapper>
        {children}
      </BodyWrapper>
      <FooterWrapper>
        <FooterInner>
          <DefaultButton text={"이전"} disabled={!isFirst} onClick={pageDown}/>
          <FooterPageIndicator>{page}</FooterPageIndicator>
          <DefaultButton text={"다음"} onClick={pageUp}/>
        </FooterInner>
      </FooterWrapper>
    </div>
  )
}

const Wrapper = styled.div`

`

const HeaderWrapper = styled.div`
  height: fit-content;
  width: auto;
  background: rgb(60, 63, 65);
  display: flex;
  align-items: center;
  padding: 16px;
`

const HeaderText = styled.div`
  font-size: x-large;
  font-weight: bold;
  color: white;
`

const BodyWrapper = styled.div`
  min-height: 32rem;
  border: 1px solid rgb(60, 63, 65);
  padding: 16px;
`

const FooterWrapper = styled.div`
  height: fit-content;
  width: auto;
  background: rgb(60, 63, 65);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

const FooterInner = styled.div`
  height: auto;
  width: fit-content;
  display: flex;
  flex-direction: row;
`

const FooterPageIndicator = styled.div`
  border: 1px solid rgb(60, 63, 65);
  background: rgb(85, 85, 85);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  margin: 0 4px;
`