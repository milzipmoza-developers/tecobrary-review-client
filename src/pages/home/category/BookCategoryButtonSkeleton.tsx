import {ReactElement} from "react";
import styled from "styled-components";
import {Skeleton} from "@mui/material";


export const BookCategoryButtonSkeleton = (): ReactElement => {
  return (
    <CategoryElement>
      <CategoryContent>
        <LogoWrapper>
          <Skeleton variant="rectangular" style={{width: "4rem", height: "4rem", borderRadius: "1rem"}}/>
        </LogoWrapper>
        <NameWrapper>
          <Skeleton variant="text" width={40}/>
        </NameWrapper>
      </CategoryContent>
    </CategoryElement>
  )
}

const CategoryElement = styled.div`
  width: 8rem;
  height: 8rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
  border-radius: 1.5rem;
  margin-right: 1rem;
`

const CategoryContent = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LogoWrapper = styled.div`
  display: flex;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
`

const NameWrapper = styled.div`
  font-weight: bold;
  font-size: small;
`