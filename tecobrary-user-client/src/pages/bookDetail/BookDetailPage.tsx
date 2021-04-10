import React, {ReactElement, useState} from "react";
import {useParams} from "react-router-dom";
import {BookDetail} from "../../interfaces";
import {getBookDetail} from "../../api/bookDetail";
import {TransparentPageFrame} from "../../components/page/TransparentPageFrame";
import BookDetailCard from "./BookDetailCard";
import Plain from "../../components/plain/Plain";
import {PageContent} from "../../components/page/PageContent";

interface Params {
  id?: string | undefined
}

function BookDetailPage(): ReactElement {
  const {id} = useParams<Params>()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [bookDetail] = useState<BookDetail>(getBookDetail.get(Number.parseInt(id!)) ? getBookDetail.get(Number.parseInt(id!))! : getBookDetail.get(1)!)

  return (
    <TransparentPageFrame header={true}>
      <PageContent>
        <BookDetailCard {...bookDetail}/>
      </PageContent>
      <PageContent>
        <Plain title='리뷰를 확인해보세요' margin='0 1rem 0 1rem'>

        </Plain>
      </PageContent>
    </TransparentPageFrame>
  )
}

export default BookDetailPage
