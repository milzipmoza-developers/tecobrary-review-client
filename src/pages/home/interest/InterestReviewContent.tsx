import {ReactElement, useEffect, useState} from "react";
import styled from "styled-components";
import {InterestedBook} from "../../../interfaces";
import {ReviewIcon} from "../../../components/icons/ReviewIcon";
import {CardBookList} from "../../../components/list/CardBookList";
import {DisplayApi} from "../../../api/display/display.service";

export const InterestReviewContent = (): ReactElement => {

  const [books, setBooks] = useState<InterestedBook[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    _initPageData()
    return () => {
      setLoading(true)
    }
  }, [])

  const _initPageData = async () => {
    try {
      setLoading(true)
      const display = await DisplayApi.getMostReviewedBooks()
      const _books = display.books.map(it => ({
        isbn: it.isbn,
        imageUrl: it.imageUrl,
        title: it.title,
        author: it.author,
        tags: it.tags.map(tag => ({...tag})),
        counts: it.counts,
      }));
      setLoading(false)
      if (!loading) {
        setBooks(_books)
      }
    } catch (e) {
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        console.error(e)
        return
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        console.error(e)
        return
      }

      console.error(e)
      return;
    }
  }

  return (
    <Wrapper>
      <CardBookList iconBadge={[<ReviewIcon/>]} books={books} loading={loading}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
`