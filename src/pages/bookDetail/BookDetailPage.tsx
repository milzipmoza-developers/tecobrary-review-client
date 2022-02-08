import React, {ReactElement, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {BookDetail} from "../../interfaces";
import {getBookDetail} from "../../api/bookDetail";
import BookDetailCard from "./BookDetailCard";
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
import {ReviewRanges} from "../../model/review/ReviewRanges";
import {Gauge} from "../../components/gauge/Gauge";
import {SortedTextBadges} from "../../components/badges/SortedTextBadges";
import SpannedCard from "../../components/card/SpannedCard";

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
  const [reviewTotal, setReviewTotal] = useState<number>()
  const [reviewSummary, setReviewSummary] = useState<ReviewRanges>()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [bookDetail] = useState<BookDetail>(getBookDetail.get(1)!)

  useEffect(() => {
    _initPageBookData()
    return () => {
      setBookLoading(true)
    }
  }, [])

  const _initPageBookData = async () => {
    try {
      if (!isbn) {
        history.goBack()
        return
      }

      setBookLoading(true)
      const foundBook = await DisplayBookApi.getBook(isbn, user.deviceId, user.token)
      const _reviewSummary = await DisplayBookApi.getReviewSummary(isbn)
      setBookLoading(false)

      if (!bookLoading) {
        setBook(foundBook.book)
        setMark(foundBook.mark)
        setTags(foundBook.tags)
        setReviewTotal(_reviewSummary.total)
        setReviewSummary(new ReviewRanges(_reviewSummary))
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
      return `리뷰가 ${reviewTotal}개 있어요`
    }
    return "아직 리뷰가 없어요"
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <PageContent marginBottom={'2rem'}>
        <BookDetailCard
          book={book ? book : bookDetail}
          marks={mark ? {...mark} : undefined}
          tags={tags?.map(it => ({...it}))}/>
      </PageContent>

      <Plain title={reviewContentTitle()}
             margin='0 1rem 0 1rem'>
      </Plain>
      <SpannedCard padding={'2rem 0 2rem 0'}>
        <Table>
          <Row>
            <Title>내용이</Title>
            <Content>
              <ScrollElements className='scroll-hidden'>
                <SortedTextBadges
                  items={[
                    {name: "💧 매우 쉬워요", count: 20},
                    {name: "쉬워요", count: 5},
                    {name: "보통이예요", count: 30},
                    {name: "어려워요", count: 20},
                    {name: "🔥 매우 어려워요", count: 35},
                  ]}/>
              </ScrollElements>
            </Content>
          </Row>
          <Row>
            <Title>도움이</Title>
            <Content>
              <ScrollElements className='scroll-hidden'>
                <SortedTextBadges
                  items={[
                    {name: "🙅 전혀 안되었어요", count: 20},
                    {name: "🤷 되었어요", count: 30},
                    {name: "🙆 많이 되었어요", count: 20},
                    {name: "🤦 안되었어요", count: 35},
                  ]}/>
              </ScrollElements>
            </Content>
          </Row>
          <Row>
            <Title>이 책은</Title>
            <Content>
              <ScrollElements className='scroll-hidden'>
                <SortedTextBadges
                  items={[
                    {name: "✏️ 개념 위주예요", count: 20},
                    {name: "🔬 특정 기술 위주예요", count: 30},
                    {name: "💻 예제 코드가 꼼꼼해요", count: 20},
                    {name: "📄 설명이 잘 되어있어요", count: 35},
                    {name: "👍 번역이 잘 되어있어요", count: 35},
                    {name: "🛠 오탈자가 많아요", count: 35},
                  ]}/>
              </ScrollElements>
            </Content>
          </Row>
        </Table>
      </SpannedCard>

      <PageContent marginBottom={'2rem'} marginTop={'2rem'}>
        <Plain title={"이만큼 읽고 리뷰를 남겼어요"} margin='0 1rem 0 1rem'>
          <Card backgroundColor='white'
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <Gauge
              name={reviewSummary?.readAll.displayName ?? ''}
              count={reviewSummary?.readAll.count ?? 0}
              total={reviewTotal ?? 1}
              color={'rgb(39, 54, 70)'}/>
            <Margin/>
            <Gauge
              name={reviewSummary?.multipleChapters.displayName ?? ''}
              count={reviewSummary?.multipleChapters.count ?? 0}
              total={reviewTotal ?? 1}
              color={'rgb(39, 54, 70)'}/>
            <Margin/>
            <Gauge
              name={reviewSummary?.oneChapter.displayName ?? ''}
              count={reviewSummary?.oneChapter.count ?? 0}
              total={reviewTotal ?? 1}
              color={'rgb(39, 54, 70)'}/>
            <Margin/>
            <Gauge
              name={reviewSummary?.aLittle.displayName ?? ''}
              count={reviewSummary?.aLittle.count ?? 0}
              total={reviewTotal ?? 1}
              color={'rgb(39, 54, 70)'}/>
            <Margin/>
            <Gauge
              name={reviewSummary?.introduction.displayName ?? ''}
              count={reviewSummary?.introduction.count ?? 0}
              total={reviewTotal ?? 1}
              color={'rgb(39, 54, 70)'}/>
          </Card>
        </Plain>
      </PageContent>

    </UserPageFrame>
  )
}

export default BookDetailPage

const Margin = styled.div`
  width: auto;
  height: 5px;
`


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