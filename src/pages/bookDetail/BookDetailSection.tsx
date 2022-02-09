import {BookMarks, Tag} from "../../interfaces";
import {ReactElement} from "react";
import BookDetailCard from "./BookDetailCard";
import BookDetailSkeletonCard from "./BookDetailSkeletonCard";

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
  book?: BookDetail
  tags?: Tag[]
  marks?: BookMarks
}


export function BookDetailSection(props: Props): ReactElement {

  const {book, tags, marks} = props

  if (book) {
    return <BookDetailCard book={book} tags={tags} marks={marks}/>
  }

  return <BookDetailSkeletonCard/>
}