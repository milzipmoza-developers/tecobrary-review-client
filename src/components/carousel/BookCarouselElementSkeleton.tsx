import styled from "styled-components";
import {Skeleton} from "@mui/material";

export const BookCarouselElementSkeleton = () => {
  return (
    <BookElement>
      <ImageWrapper>
        <Skeleton variant="rectangular" height={"10rem"} width={"8rem"} style={{borderRadius: "1rem"}}/>
      </ImageWrapper>
      <BookAuthor>
        <Skeleton variant="text"/>
      </BookAuthor>
      <BookTitle>
        <Skeleton variant="text"/>
      </BookTitle>
    </BookElement>
  )
}

const BookElement = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  cursor: pointer;
`

const ImageWrapper = styled.div`
  height: 10rem;
  margin-bottom: 1rem;
`

const BookAuthor = styled.div`
  font-size: small;
  font-weight: lighter;
  margin-bottom: 0.5rem;
`

const BookTitle = styled.div`
  font-size: small;
  font-weight: bold;
`