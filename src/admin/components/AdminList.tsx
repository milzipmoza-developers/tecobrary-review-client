import {ReactElement, ReactNode} from "react";
import styled from "styled-components";
import DefaultButton from "./DefaultButton";
import {Element, getFromHeader, ListElementProps, ListHeaderProps, ListPropNameProps} from "./ListProps";

interface Props {
  title: string
  headers: ListHeaderProps[]
  elements?: ListElementProps
  page?: number
  isFirst?: boolean
  isLast?: boolean
  pageUp?: () => void
  pageDown?: () => void
  onElementClick?: (element: Element) => void
  children?: ReactNode
}

export const AdminList = (props: Props): ReactElement => {

  const {title, headers, elements, page, isFirst, isLast, pageUp, pageDown, onElementClick, children} = props

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
        {elements
          ? elements.data.map((data: Element, index: number) => {
            return (
              <ElementWrapper
                key={index}
                id={`list-element-${index}`}
                onClick={() => onElementClick ? onElementClick(data) : null}>
                {propNames.map((propName: string, index: number) => {
                  return (
                    <ElementContent flex={getFromHeader(headers, propName)?.flex} key={index}>
                      <ElementText>
                        {data[propName]}
                      </ElementText>
                    </ElementContent>
                  )
                })}
              </ElementWrapper>
            )
          })
          : <ElementEmptyBox className="empty">비어있음</ElementEmptyBox>}
      </BodyWrapper>
      <FooterWrapper>
        <FooterInner>
          <DefaultButton text={"이전"} disabled={isLast} onClick={pageDown}/>
          <FooterPageIndicator>{page}</FooterPageIndicator>
          <DefaultButton text={"다음"} disabled={isFirst} onClick={pageUp}/>
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

  &:hover {
    background: rgb(203, 203, 203, 50%);
    cursor: pointer;
  }
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
  display: flex;
  justify-content: center;
`

const ElementEmptyBox = styled.div`
  padding: 16px;
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