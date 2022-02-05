import React, {ReactElement} from "react";
import {Book} from "../../interfaces";
import styled from "styled-components";
import {BookSearchList} from "./BookSearchList";

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

const SearchDivider = styled.div`
  width: auto;
  height: 1px;
  background-color: #ecf0f1;
  margin-bottom: 1rem;
`