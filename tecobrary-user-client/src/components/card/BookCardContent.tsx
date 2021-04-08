import React, {ReactElement} from "react";
import {CategoryBadges} from "../badges/CategoryBadges";
import {BookActionButtons} from "../buttons/BookActionButtons";
import styled from "styled-components";
import {BookLike, BookMarked, Category} from "../../interfaces";
import {FoldableCard} from "./FoldableCard";

interface Props {
  id: number
  imageUrl: string
  title: string
  author: string
  publisher: string
  description: string
  categories: Category[]
  like: BookLike
  bookMark: BookMarked
}

export const BookCardContent = (props: Props): ReactElement => {
  return (
    <Wrapper>
      <BookDetail>
        <BookDetailImage>
          <img src={props.imageUrl} width="100%"/>
        </BookDetailImage>
        <BookDetailContent>
          <CategoryBadges categories={props.categories}/>
          <div>{props.author}</div>
          <div>{props.publisher}</div>
          <BookActionButtons id={props.id}
                             like={props.like.liked}
                             likeCounts={props.like.counts}
                             marked={props.bookMark.marked}
                             bookMarkedCounts={props.bookMark.counts}
                             detailButton={false}/>
        </BookDetailContent>
      </BookDetail>
      <FoldableCard backgroundColor="#ecf0f1">
        <div>{props.description}</div>
      </FoldableCard>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100%;
`

const BookDetail = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: 100%;
`

const BookDetailImage = styled.div`
  display: flex;
  flex: 1.2;
`

const BookDetailContent = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`
