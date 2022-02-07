import React, {ReactElement, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {BookDetail} from "../../interfaces";
import {getBookDetail} from "../../api/bookDetail";
import BookDetailCard from "./BookDetailCard";
import Plain from "../../components/plain/Plain";
import {PageContent} from "../../components/page/PageContent";
import BookReviewCard from "./BookReviewCard";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../states/User";
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";
import {RequestAction, requestTemplate} from "../../api";
import {DisplayBookApi} from "../../api/display/display.book.service";
import {DisplayBookDetail, DisplayBookMark} from "../../api/display/display.book.model";
import {DisplayBookTag} from "../../api/display/display.model";

interface Params {
  isbn?: string
}

function BookDetailPage(): ReactElement {
  const user = useRecoilValue(userState)
  const setPop = useSetRecoilState(popState)

  const {isbn} = useParams<Params>()
  const history = useHistory()
  const [book, setBook] = useState<DisplayBookDetail>()
  const [mark, setMark] = useState<DisplayBookMark>()
  const [tags, setTags] = useState<DisplayBookTag[]>()
  const [reviews] = useState([])

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [bookDetail] = useState<BookDetail>(getBookDetail.get(1)!)

  useEffect(() => {
    _initPageData()
  }, [])

  const _initPageData = async () => {
    await requestTemplate(bookDetailRequestAction)
  }

  const bookDetailRequestAction: RequestAction = {
    doOnSuccess: async () => {
      if (!isbn) {
        history.goBack()
        return
      }
      const foundBook = await DisplayBookApi.getBook(isbn, user.deviceId, user.token)
      setBook(foundBook.book)
      setMark(foundBook.mark)
      setTags(foundBook.tags)
    },
    doOn400Errors: (e) => {
      setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
      history.goBack()
    },
    doOn500Errors: (e) => {
      setPop({message: e.response.data.message, open: true, duration: 3000, color: "ERROR"})
      history.goBack()
    },
    doErrors: () => {
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const bookCard = book ? {...book} : {...bookDetail}

  const reviewContentTitle = () => {
    if (reviews.length == 0) {
      return "아직 등록된 리뷰가 없어요"
    }
    return "리뷰를 확인해보세요"
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <PageContent style={{marginBottom: '2rem'}}>
        <BookDetailCard
          {...bookCard}
          marks={mark ? {...mark} : undefined}
          tags={tags?.map(it => ({...it}))}/>
      </PageContent>
      <PageContent style={{marginBottom: '2rem', marginTop: '15rem'}}>
        <Plain title={reviewContentTitle()} margin='0 1rem 0 1rem'>
          <BookReviewCard isbn={isbn}
                          slice={3}
                          button={true}
                          reviews={[]}
                          counts={1}/>
        </Plain>
      </PageContent>
    </UserPageFrame>
  )
}

export default BookDetailPage