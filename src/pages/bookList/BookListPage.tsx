import React, {ReactElement, useEffect, useState} from "react";
import {PageContent} from "../../components/page/PageContent";
import Plain from "../../components/plain/Plain";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import Card from "../../components/card/Card";
import {CardBookListElement} from "../../components/list/CardBookListElement";
import {useQueryString} from "../../hooks";
import {PageData} from "../../admin/api/interfaces";
import {Book} from "../../api/book/book.model";
import {RequestAction, requestTemplate} from "../../api";
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";
import {BookApi} from "../../api/book/book.service";
import {useSetRecoilState} from "recoil";
import InfiniteScroll from "react-infinite-scroll-component";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {BookCategory} from "../../admin/api/book/book.model";

interface QueryString {
  category?: string
  keyword?: string
  tag?: string
}

function BookListPage(): ReactElement {
  const {category, keyword, tag}: QueryString = useQueryString()
  const [queryParam, setQueryParam] = useState<QueryString>()

  const setPop = useSetRecoilState(popState)
  const history = useHistory()

  const size = 10
  const [page, setPage] = useState<number>(0)
  const [bookCategory, setBookCategory] = useState<BookCategory>()
  const [categoryPageData, setCategoryPageData] = useState<PageData<Book>>({
    total: 0,
    size: 0,
    isFirst: true,
    isLast: true,
    items: []
  })
  const [categoryNo] = useState(category ?? '')

  useEffect(() => {
    setQueryParam({category, keyword, tag})
  }, [])

  useEffect(() => {
    initPageData();
  }, [])

  const initPageData = async () => await requestTemplate(pageRequest)

  const pageRequest: RequestAction = {
    doOnSuccess: async () => {
      const categoryBookPage = await BookApi.get(categoryNo, {page, size})
      const {category, pageData} = categoryBookPage
      setBookCategory(category)
      setCategoryPageData({...pageData})
      setPage(page + 1)
    },
    doOn400Errors: (e) => {
      setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
    },
    doErrors: () => {
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const loadMore = async () => await requestTemplate(loadMorePageRequest)

  const loadMorePageRequest: RequestAction = {
    doOnSuccess: async () => {
      const categoryBookPage = await BookApi.get(categoryNo, {page, size})
      const {pageData} = categoryBookPage
      setCategoryPageData({
        ...categoryPageData,
        items: categoryPageData.items.concat(pageData.items)
      })
      setPage(page + 1)
    },
    doOn400Errors: (e) => {
      setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
    },
    doErrors: () => {
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const selectSubtitle = () => {
    if (queryParam?.category) {
      return `${bookCategory?.name ?? "카테고리"}에 관련된 도서 목록이예요`
    }
    if (queryParam?.keyword) {
      return `${queryParam.keyword}에 관련된 도서 목록이예요`
    }
    if (queryParam?.tag) {
      return `${queryParam.tag}에 관련된 도서 목록이예요`
    }
    return `도서 목록이예요`
  }

  const itemOnClick = (isbn: string) => () => {
    history.push(`/books/${isbn}`)
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <PageContent style={{margin: '3rem 1rem 0rem 1rem'}}>
        <Plain title='리뷰를 확인해보세요'
               subTitle={selectSubtitle()}
               subTitleMargin='0 1rem 6px 1rem'>
          <Card backgroundColor='white'
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            {categoryPageData.items.length == 0
              ? <EmptyWrapper>목록이 비어있어요</EmptyWrapper>
              : <InfiniteScroll
                dataLength={categoryPageData.items.length}
                next={loadMore}
                hasMore={!categoryPageData.isLast}
                loader={<h4>Loading...</h4>}>
                {categoryPageData.items.map((item, index: number) => {
                  return (<CardBookListElement isbn={item.isbn}
                                               imageUrl={item.detail.imageUrl}
                                               title={item.detail.title}
                                               author={item.detail.author}
                                               tags={item.tags.map(it => ({...it}))}
                                               key={index}
                                               itemOnClick={itemOnClick(item.isbn)}/>)
                })}
              </InfiniteScroll>
            }
          </Card>
        </Plain>
      </PageContent>
    </UserPageFrame>
  )
}

export default BookListPage

const EmptyWrapper = styled.div`
  display: flex;
  width: auto;
  height: 8rem;
  justify-content: center;
  align-items: center;
`