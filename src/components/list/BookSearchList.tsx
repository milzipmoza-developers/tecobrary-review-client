import {ReactElement} from "react";
import {Book} from "../../interfaces";
import {CardBookElementSkeleton} from "./CardBookElementSkeleton";
import {BookSearchElement} from "./BookSearchElement";

interface Props {
  itemOnClick?: (id: string) => void
  loading?: boolean
  books?: Book[]
}

export const BookSearchList = (props: Props): ReactElement => {
  const {itemOnClick, loading, books} = props

  return (<>
    {loading && !books
      ? ([1, 2, 3].map((index: number) => (
        <CardBookElementSkeleton key={index}/>
      )))
      : (books?.map((book: Book, index: number) => (
        <BookSearchElement {...book}
                           key={index}
                           itemOnClick={itemOnClick}/>
      )))
    }
  </>)
}