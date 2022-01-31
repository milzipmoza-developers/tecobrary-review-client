import React, {ReactElement, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {BookDetail} from "../../interfaces";
import {getBookDetail} from "../../api/bookDetail";
import BookDetailCard from "./BookDetailCard";
import Plain from "../../components/plain/Plain";
import {PageContent} from "../../components/page/PageContent";
import BookReviewCard from "./BookReviewCard";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {DisplayApi} from "../../api/display/display.service";
import {DisplayBookDetail, DisplayBookMark, DisplayBookTag} from "../../api/display/display.model";

interface Params {
  isbn?: string
}

function BookDetailPage(): ReactElement {
  const {isbn} = useParams<Params>()
  const history = useHistory()
  const [book, setBook] = useState<DisplayBookDetail>()
  const [mark, setMark] = useState<DisplayBookMark>()
  const [tags, setTags] = useState<DisplayBookTag[]>()
  const [reviews, setReviews] = useState([])

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [bookDetail] = useState<BookDetail>(getBookDetail.get(1)!)

  useEffect(() => {
    _init()
  }, [])

  const _init = async () => {
    if (!isbn) {
      history.goBack()
      return
    }
    try {
      const foundBook = await DisplayApi.getBook(isbn)
      setBook(foundBook.book)
      setMark(foundBook.mark)
      setTags(foundBook.tags)
    } catch (e) {
      console.log(e)
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
          {...mark}
          tags={tags?.map(it => ({
            name: it.name,
            color: it.colorCode
          }))}/>
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