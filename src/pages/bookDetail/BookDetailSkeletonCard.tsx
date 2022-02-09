import React, {ReactElement} from "react";
import styled from "styled-components";
import {Skeleton} from "@mui/material";

function BookDetailSkeletonCard(): ReactElement {

  const BookPublishInfo = () => (
    <BookPublishInfoWrapper>
      <div>
        <Skeleton variant="text" width={"6rem"} height={'24px'}/>
      </div>
      <div>
        <Skeleton variant="text" width={"8rem"} height={'24px'}/>
      </div>
    </BookPublishInfoWrapper>
  )

  const BookSubInfo = () => {
    return (
      <BookSubInfoWrapper>
        <BookPublishDateWrapper>
          <Skeleton variant="text" width={"8rem"} height={'36px'}/>
        </BookPublishDateWrapper>
        <Skeleton variant="text" width={"4rem"} height={'36px'}/>
      </BookSubInfoWrapper>
    )
  }

  return (
    <>
      <Space/>
      <Wrapper>
        <ImageWrapper>
          <Skeleton variant="rectangular" height={"12.5rem"} width={"10rem"} style={{borderRadius: "inherit"}}/>
        </ImageWrapper>
        <BookDetailWrapper>
          <div style={{margin: '1rem'}}>
            {/*<Skeleton variant="text" width={"8rem"}/>*/}
          </div>
          <BookTitleWrapper>
            <Skeleton variant="text" width={"8rem"} height={'2rem'}/>
          </BookTitleWrapper>
          <BookPublishInfo/>
          <BookSubInfo/>
          <BookDescriptionWrapper>
            <Skeleton variant="text" width={"100%"} height={'8rem'}/>
          </BookDescriptionWrapper>
        </BookDetailWrapper>
      </Wrapper>
    </>
  )
}

export default BookDetailSkeletonCard

const Space = styled.div`
  height: 8rem;
  width: auto;
`

const Wrapper = styled.div`
  position: relative;
  width: auto;
  background-color: white;
  color: black;
  border-radius: 2rem;
  padding: 1rem;
`

const ImageWrapper = styled.div`
  position: relative;
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 12.5rem;
  top: -8rem;
  border-radius: 1rem;
  margin-bottom: -6rem;
`

const Image = styled.img`
  border-radius: 1rem;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`

const BookDetailWrapper = styled.div`
  position: relative;
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
`

const BookTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const BookPublishInfoWrapper = styled.div`
  text-align: center;
  margin: 0 0 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const BookSubInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const BookPublishDateWrapper = styled.div`
  font-weight: lighter;
`

const BookDescriptionWrapper = styled.div`
  font-weight: lighter;
  font-size: small;
  margin: 2rem 1rem 2rem 1rem;
`
