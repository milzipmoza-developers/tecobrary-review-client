import {ReactElement} from "react";
import {Book, InterestedBook, ListBook} from "../../interfaces";
import {CardBookListElement} from "./CardBookListElement";
import styled from "styled-components";
import {CountedIconBadge} from "../badges/CountedIconBadge";
import {CardBookElementSkeleton} from "./CardBookElementSkeleton";

interface Props {
  iconBadge?: ReactElement[]
  itemOnClick?: (id: string) => void
  loading?: boolean
  books?: Book[]
}

export const CardBookList = (props: Props): ReactElement => {
  const {iconBadge, itemOnClick, loading, books} = props

  const conditionalCountedIconBadge = (book: Book): ReactElement => {
    if (!iconBadge) {
      return <></>
    }
    if (book.hasOwnProperty('counts')) {
      return (
        <>
          <CountedIconBadge counts={(book as InterestedBook).counts}>
            {iconBadge[0]}
          </CountedIconBadge>
        </>
      )
    }

    if (book.hasOwnProperty('countDetail')) {
      const aBook = book as ListBook
      return (<IconWrapper>
        <CountedIconBadge counts={aBook.countDetail.review}>
          {iconBadge[0]}
        </CountedIconBadge>
        {/*todo: after gather some data*/}
        {/*<CountedIconBadge counts={aBook.countDetail.like}>*/}
        {/*  {iconBadge[1]}*/}
        {/*</CountedIconBadge>*/}
        {/*<CountedIconBadge counts={aBook.countDetail.bookMarked}>*/}
        {/*  {iconBadge[2]}*/}
        {/*</CountedIconBadge>*/}
      </IconWrapper>)
    }

    return <></>
  }

  return (<>
    {loading && !books
      ? ([1, 2, 3].map((index: number) => (
        <CardBookElementSkeleton key={index}/>
      )))
      : (books?.map((book: Book, index: number) => (
        <CardBookListElement {...book}
                             key={index}
                             iconBadge={conditionalCountedIconBadge(book)}
                             itemOnClick={itemOnClick}/>
      )))
    }
  </>)
}

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
`