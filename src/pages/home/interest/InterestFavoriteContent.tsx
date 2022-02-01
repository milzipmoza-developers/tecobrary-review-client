import {ReactElement, useEffect, useState} from "react";
import styled from "styled-components";
import {InterestedBook} from "../../../interfaces";
import {BookmarkedIcon} from "../../../components/icons/BookmarkedIcon";
import {CardBookList} from "../../../components/list/CardBookList";
import {RequestAction, requestTemplate} from "../../../api";
import {DisplayApi} from "../../../api/display/display.service";

export const InterestFavoriteContent = (): ReactElement => {

  const [books, setBooks] = useState<InterestedBook[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    _initData()
  }, [])

  const _initData = async () => {
    requestTemplate(requestMostLikeRequest)
  }

  const requestMostLikeRequest: RequestAction = {
    doOnSuccess: async () => {
      setLoading(true)
      const display = await DisplayApi.getMostFavoriteBooks()
      const _books = display.books.map(it => ({
        isbn: it.isbn,
        imageUrl: it.imageUrl,
        title: it.title,
        author: it.author,
        tags: it.tags.map(tag => ({...tag})),
        counts: it.counts,
      }));
      setBooks(_books)
      setLoading(false)
    },
    doOn400Errors: (e) => {
      console.error(e)
    },
    doOn500Errors: (e) => {
      console.error(e)
    },
    doErrors: (e) => {
      console.error(e)
    }
  }
  return (
    <Wrapper>
      <CardBookList iconBadge={[<BookmarkedIcon/>]} books={books} loading={loading}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
`