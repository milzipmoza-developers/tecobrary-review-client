import {CardBookList} from "./CardBookList";
import React from "react";
import {Book} from "../../interfaces";
import styled from "styled-components";

interface Props {
  books?: Book[]
  itemOnClick?: (id: string) => void
}

export const BookSearchResultList = ({books, itemOnClick}: Props) => {
  return (
    <>
      {books && books.length != 0 ? <SearchDivider/> : null}
      <CardBookList books={books}
                    whenEmpty={<EmptyList/>}
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

const EmptyList = styled.div``