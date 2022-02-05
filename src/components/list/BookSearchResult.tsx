import React, {ReactElement} from "react";
import {Book} from "../../interfaces";
import {BookSearchList} from "./BookSearchList";
import {SearchDivider} from "../divider";

interface Props {
  books?: Book[]
  itemOnClick?: (id: string) => void
}

export const BookSearchResult = ({books, itemOnClick}: Props): ReactElement => {
  return (
    <>
      {books && books.length != 0 ? <SearchDivider/> : null}
      <BookSearchList books={books}
                      itemOnClick={itemOnClick}/>
    </>
  )
}
