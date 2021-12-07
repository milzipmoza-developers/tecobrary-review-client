import {ReactElement, ReactNode, useState} from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import {findFromData, findFromHeader, ListElementProps, ListHeaderProps, ListPropNameProps} from "./ListProps";

interface Props {
  title: string
  headers: ListHeaderProps[],
  elements?: ListElementProps[]
  children?: ReactNode,
}

export const AdminList = ({title, headers, elements, children}: Props): ReactElement => {

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

  const propNames: string[] = headers.map((header: ListPropNameProps) => header.propName)

  return (
    <div>
      <TitleWrapper>
        <TitleText>{title}</TitleText>
      </TitleWrapper>
      <HeaderWrapper>
        {headers.map((header: ListHeaderProps, index: number) => (
          <HeaderContent flex={header.flex} key={index}>
            <HeaderText>{header.name}</HeaderText>
          </HeaderContent>
        ))}
      </HeaderWrapper>
      <BodyWrapper>
        {elements ? elements.map((element: ListElementProps, index: number) => {
          return (
            <ElementWrapper key={index}>
              {propNames.map((propName: string, index: number) => {
                return (
                  <ElementContent flex={findFromHeader(headers, propName)?.flex} key={index}>
                    <ElementText>
                      {findFromData(element.data, propName)?.value}
                    </ElementText>
                  </ElementContent>
                )
              })}
            </ElementWrapper>
          )
        }) : '비어있음'}
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

const TitleWrapper = styled.div`
  height: fit-content;
  width: auto;
  background: rgb(60, 63, 65);
  display: flex;
  align-items: center;
  padding: 16px;
`

const TitleText = styled.div`
  font-size: x-large;
  font-weight: bold;
  color: white;
`

const HeaderWrapper = styled.div`
  color: white;
  border: 1px solid rgb(85, 85, 85);
  background: rgb(49, 51, 53);
  display: flex;
  flex-direction: row;
  padding: 8px;
`

interface HeaderContentProps {
  flex: number
}

const HeaderContent = styled.div<HeaderContentProps>`
  flex: ${props => props.flex ? props.flex : 0};
`

const HeaderText = styled.div`
  text-align: center;
`

const ElementWrapper = styled.div`
  color: black;
  height: 4rem;
  border-bottom: 1px solid rgb(85, 85, 85);
  background: white;
  display: flex;
  flex-direction: row;
  padding: 8px;
  align-items: center;
`

interface ElementContentProps {
  flex?: number
}

const ElementContent = styled.div<ElementContentProps>`
  flex: ${props => props.flex ? props.flex : 0};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const ElementText = styled.div`
  text-align: center;
`

const BodyWrapper = styled.div`
  min-height: 32rem;
  border: 1px solid rgb(60, 63, 65);
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