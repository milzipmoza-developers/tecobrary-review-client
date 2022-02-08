import React, {ReactElement} from "react";
import {TagBadges} from "../../components/badges/TagBadges";
import {parseDate} from "../../utils/date";
import {BookDetailActionButtons} from "./BookDetailActionButtons";
import styled from "styled-components";
import {BookMarks, BookTechDetail, Tag} from "../../interfaces";
import Plain from "../../components/plain/Plain";

interface BookDetail {
  isbn: string
  imageUrl: string
  title: string
  publisher: string
  author: string
  publishDate: string
  description: string
}

interface Props {
  book: BookDetail
  tags?: Tag[]
  marks?: BookMarks
  techDetail?: BookTechDetail
}

function BookDetailCard(props: Props): ReactElement {

  const {book, tags, marks, techDetail} = props

  const BookPublishInfo = () => (
    <BookPublishInfoWrapper>
      <div>{book?.publisher}</div>
      <div>{book?.author}</div>
    </BookPublishInfoWrapper>
  )

  const BookSubInfo = () => (
    <BookSubInfoWrapper>
      <BookPublishDateWrapper>출판일 {parseDate(book.publishDate)}</BookPublishDateWrapper>
      <BookDetailActionButtons isbn={book.isbn}
                               like={props.marks ? props.marks.like.liked : false}
                               likeCounts={props.marks ? props.marks.like.counts : 0}
                               favorite={props.marks ? props.marks.favorite.marked : false}
                               favoriteCounts={props.marks ? props.marks.favorite.counts : 0}/>
    </BookSubInfoWrapper>
  )

  const BookTechInfo = () => (
    props.techDetail
      ? (
        <Plain title='이런 기술을 다뤄요' margin="0 0 2rem 0">
          <div style={{marginLeft: '0.5rem', fontWeight: 'lighter'}}>
            주로 <b>{props.techDetail?.mainTech}</b> <b>{props.techDetail?.mainVersion}</b> 버전을 다뤄요
          </div>
          <div style={{marginLeft: '0.5rem', fontWeight: 'lighter'}}>
            추가로 <b>{props.techDetail?.additionalTech}</b> 도 다루고 있어요
          </div>
          <div style={{marginLeft: '0.5rem', fontWeight: 'lighter'}}>
            버전과의 의존성은 {props.techDetail?.versionDependency}
          </div>
        </Plain>
      )
      : null
  )

  return (
    <>
      <Space/>
      <Wrapper>
        <ImageWrapper>
          <Image src={book.imageUrl}/>
        </ImageWrapper>
        <BookDetailWrapper>
          <TagBadges tags={props.tags ? props.tags : []}/>
          <BookTitleWrapper>{book.title}</BookTitleWrapper>
          <BookPublishInfo/>
          <BookSubInfo/>
          <BookDescriptionWrapper>
            {book.description}
          </BookDescriptionWrapper>
        </BookDetailWrapper>
        <BookTechInfo/>
      </Wrapper>
    </>
  )
}

export default BookDetailCard

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
  width: auto;
  font-weight: bold;
  font-size: 1.5em;
  text-align: center;
  margin: 1rem 0 0.5rem 0;
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
