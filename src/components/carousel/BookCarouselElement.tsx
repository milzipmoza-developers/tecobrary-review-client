import styled from "styled-components";
import {ReactElement} from "react";

interface Props {
  onClick: () => void
  imageUrl: string
  author: string
  title: string
}

export const BookCarouselElement = (props: Props): ReactElement => {
  const {onClick, imageUrl, author, title} = props

  return (
    <BookElement onClick={onClick}>
      <ImageWrapper>
        <Image src={imageUrl}/>
      </ImageWrapper>
      <BookAuthor>{author}</BookAuthor>
      <BookTitle>{title}</BookTitle>
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
  min-width: 6rem;
  margin-bottom: 1rem;
`

const Image = styled.img`
  border-radius: 1rem;
  height: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
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