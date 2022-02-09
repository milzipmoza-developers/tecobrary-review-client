import React, {ReactElement, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import Plain from "../../components/plain/Plain";
import {PageContent} from "../../components/page/PageContent";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../states/User";
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";
import {DisplayBookApi} from "../../api/display/display.book.service";
import {DisplayBookDetail, DisplayBookMark} from "../../api/display/display.book.model";
import {DisplayBookTag} from "../../api/display/display.model";
import Card from "../../components/card/Card";
import styled from "styled-components";
import {ReviewRange} from "../../model/review/ReviewRange";
import {SortedTextBadges} from "../../components/badges/SortedTextBadges";
import SpannedCard from "../../components/card/SpannedCard";
import {ReviewGauges} from "../../components/gauge/ReviewGauges";
import {ReviewContentItem} from "../../model/review/ReviewContentItem";
import {ReviewInformativeItem} from "../../model/review/ReviewInformativeItem";
import {ReviewSelectableItem} from "../../model/review/ReviewSelectableItem";
import {DraftReview} from "../../api/review/draftReview.utils";
import {BookDetailSection} from "./BookDetailSection";

interface Params {
  isbn?: string
}

function BookDetailPage(): ReactElement {
  const user = useRecoilValue(userState)
  const setPop = useSetRecoilState(popState)

  const {isbn} = useParams<Params>()
  const history = useHistory()

  const [bookLoading, setBookLoading] = useState(false)
  const [book, setBook] = useState<DisplayBookDetail>()
  const [mark, setMark] = useState<DisplayBookMark>()
  const [tags, setTags] = useState<DisplayBookTag[]>()

  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewTotal, setReviewTotal] = useState<number>()
  const [reviewRanges, setReviewRanges] = useState<ReviewRange[]>()

  const [keywordContents, setKeywordContents] = useState<ReviewContentItem[]>()
  const [keywordInformatives, setKeywordInformatives] = useState<ReviewInformativeItem[]>()
  const [keywordSelectables, setKeywordSelectables] = useState<ReviewSelectableItem[]>()

  useEffect(() => {
    if (!isbn) {
      history.goBack()
      return
    }
    _initPageBookData()
    _initReviewData()
    return () => {
      setBookLoading(true)
      setReviewLoading(true)
    }
  }, [])

  const _initPageBookData = async () => {
    try {
      if (!isbn) {
        return
      }

      setBookLoading(true)
      const foundBook = await DisplayBookApi.getBook(isbn, user.deviceId, user.token)
      setBookLoading(false)

      if (!bookLoading) {
        setBook(foundBook.book)
        setMark(foundBook.mark)
        setTags(foundBook.tags)
      }
    } catch (e) {
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
        history.goBack()
        return
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: e.response.data.message, open: true, duration: 3000, color: "ERROR"})
        history.goBack()
        return
      }

      setPop(NETWORK_ERROR_DEFAULT)
      return;
    }
  }

  const _initReviewData = async () => {
    try {
      if (!isbn) {
        return
      }

      setReviewLoading(true)
      const reviewSummary = await DisplayBookApi.getReviewSummary(isbn)
      const keywords = await DisplayBookApi.getReviewKeywords(isbn)
      setReviewLoading(false)

      if (!reviewLoading) {
        setReviewTotal(reviewSummary.total)

        const ranges = reviewSummary.ranges
          .map(it => new ReviewRange(it.range, it.count))
        setReviewRanges(ranges)

        const contents = keywords.content
          .map(it => new ReviewContentItem(it.keyword, it.count))
        setKeywordContents(contents)

        const informatives = keywords.informative
          .map(it => new ReviewInformativeItem(it.keyword, it.count))
        setKeywordInformatives(informatives)

        const selectables = keywords.selectables
          .map(it => new ReviewSelectableItem(it.keyword, it.count))
        setKeywordSelectables(selectables)
      }
    } catch (e) {
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
        history.goBack()
        return
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: e.response.data.message, open: true, duration: 3000, color: "ERROR"})
        history.goBack()
        return
      }

      setPop(NETWORK_ERROR_DEFAULT)
      return;
    }
  }

  const reviewContentTitle = () => {
    if (reviewTotal && reviewTotal != 0) {
      return `${reviewTotal}개의 리뷰를 요약했어요`
    }
    return "아직 리뷰가 없어요"
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <PageContent marginBottom={'2rem'}>
        <BookDetailSection
          book={book ? book : undefined}
          marks={mark ? {...mark} : undefined}
          tags={tags?.map(it => ({...it}))}/>
      </PageContent>

      <Plain title={reviewContentTitle()}
             margin='0 1rem 0 1rem'>
      </Plain>
      {reviewTotal != 0
        ? <SpannedCard padding={'2rem 0 2rem 0'}>
          <Table>
            {keywordContents && keywordContents.length != 0 ? <Row>
              <Title>내용이</Title>
              <Content>
                <ScrollElements className='scroll-hidden'>
                  <SortedTextBadges
                    items={keywordContents}/>
                </ScrollElements>
              </Content>
            </Row> : null}
            {keywordInformatives && keywordInformatives.length != 0 ? <Row>
              <Title>도움이</Title>
              <Content>
                <ScrollElements className='scroll-hidden'>
                  <SortedTextBadges
                    items={keywordInformatives}/>
                </ScrollElements>
              </Content>
            </Row> : null}
            {keywordSelectables && keywordSelectables.length != 0 ? <Row>
              <Title>이 책은</Title>
              <Content>
                <ScrollElements className='scroll-hidden'>
                  <SortedTextBadges
                    items={keywordSelectables}/>
                </ScrollElements>
              </Content>
            </Row> : null}
          </Table>
        </SpannedCard>
        : <Card backgroundColor='white'
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                margin='0 1rem 0 1rem'>
          <EmptyReviewWrapper onClick={() => {
            if (book && tags) {
              DraftReview.setBook({
                isbn: book.isbn,
                title: book.title,
                publisher: book.publisher,
                author: book.author,
                imageUrl: book.imageUrl,
                description: book.description,
                publishDate: book.publishDate,
                tags: tags,
              })
              history.push(`/reviews?isbn=${isbn}`)
            }
          }}>
            첫 번째 리뷰 작성하러가기
          </EmptyReviewWrapper>
        </Card>}

      {reviewRanges && reviewTotal != 0 ?
        <PageContent marginBottom={'2rem'} marginTop={'2rem'}>
          <Plain title={"이만큼 읽고 리뷰를 남겼어요"} margin='0 1rem 0 1rem'>
            <Card backgroundColor='white'
                  boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
              <ReviewGauges items={reviewRanges}/>
            </Card>
          </Plain>
        </PageContent>
        : null}

    </UserPageFrame>
  )
}

export default BookDetailPage

const Table = styled.div`
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

const Content = styled.div`
  height: fit-content;
  width: auto;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
`

const ScrollElements = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  width: fit-content;
  padding: 4px 10px 4px 10px;
`

const Title = styled.div`
  display: flex;
  min-width: 3rem;
  height: 100%;
  font-weight: bold;
  font-size: small;
  margin-left: 1rem;
  margin-bottom: 4px;
  justify-content: flex-start;
  align-items: center;
`

const EmptyReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`