import {ReactElement} from "react";
import styled from "styled-components";
import {Skeleton} from "@mui/material";

export const CardBookElementSkeleton = (): ReactElement => {

  return (
    <Element>
      <ElementImage>
        <Skeleton variant="rectangular" style={{width: "4rem", height: "5rem", borderRadius: "10%"}}/>
      </ElementImage>
      <ElementContent>
        <ElementTitle>
          <Skeleton variant="text" height={30}/>
        </ElementTitle>
        <ElementLine>
          <Skeleton variant="text" width={60}/>
          <ElementAuthor>
            <Skeleton variant="text" width={30}/>
          </ElementAuthor>
        </ElementLine>
        <ElementLastLine>
          <Skeleton variant="text" width={40} height={20}/>
        </ElementLastLine>
      </ElementContent>
    </Element>
  )
}


const Element = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  cursor: pointer;
  align-items: center;
`

const ElementImage = styled.div`
  max-width: 4rem;
  min-width: 4rem;
  margin-right: 1rem;
`

const ElementContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const ElementTitle = styled.div`
  font-size: small;
  font-weight: bold;
  width: 100%;
`

const ElementLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: auto;
`

const ElementAuthor = styled.div`
  font-size: small;
  font-weight: lighter;
  margin-left: auto;
`

const ElementLastLine = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: auto;
  justify-content: flex-end;
`