import {CardBookListElement} from "../../components/list/CardBookListElement";
import React, {ReactElement} from "react";
import {TextButton} from "../../components/buttons/TextButton";
import {Book} from "../../interfaces";

interface Props {
  book: Book
  onInitButtonClick?: () => void
}

export const SelectedReviewBook = ({book, onInitButtonClick}: Props): ReactElement => {
  return (
    <>
      <CardBookListElement isbn={book.isbn}
                           imageUrl={book.imageUrl}
                           title={book.title}
                           author={book.author}
                           tags={book.tags}/>
      <TextButton onClick={onInitButtonClick}>다시 고르기</TextButton>
    </>
  )
}