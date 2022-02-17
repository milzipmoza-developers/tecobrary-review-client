import React, {ReactElement, useEffect, useState} from "react";
import {Category, NewBook} from "../../interfaces";
import SpannedCard from "../../components/card/SpannedCard";
import Plain from "../../components/plain/Plain";
import {HomeNewBookCarousel} from "./newbook/HomeNewBookCarousel";
import InterestCard from "./interest/InterestCard";
import {PageContent} from "../../components/page/PageContent";
import BookCategories from "./category/BookCategories";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {DisplayMainCategory, DisplayMainNewBook} from "../../api/display/display.model";
import {DisplayApi} from "../../api/display/display.service";
import {NETWORK_ERROR_DEFAULT, popState, SERVER_ERROR_DEFAULT} from "../../states/Pop";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {RequestAction, requestTemplate} from "../../api";
import Card from "../../components/card/Card";
import {SelectedReviewBook} from "../review/SelectedReviewBook";
import {BookSearchInputOpenButton} from "../../components/buttons/BookSearchInputOpenButton";
import {PopupBackground} from "../../components/background/PopupBackground";
import {BookSearchInput} from "../../components/input/BookSearchInput";
import {SearchDivider} from "../../components/divider";
import {TextButton} from "../../components/buttons/TextButton";
import {BookSearchResult} from "../../components/list/BookSearchResult";
import {ReviewApi} from "../../api/review/review.service";
import {userState} from "../../states/User";
import {SearchGuide} from "../../components/input/SearchGuide";
import {ReviewSearchBook} from "../../api/review/review.model";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

function categoryMapper(displayCategories?: DisplayMainCategory[]): Category[] {
  if (!displayCategories) {
    return []
  }
  return displayCategories.map(it => ({
    no: it.no,
    name: it.name,
    imageUrl: it.imageUrl
  }))
}

function bookMapper(displayBooks?: DisplayMainNewBook[]): NewBook[] {
  if (!displayBooks) {
    return []
  }
  return displayBooks.map(it => ({
    isbn: it.isbn,
    title: it.title,
    author: it.author,
    imageUrl: it.imageUrl
  }))
}

interface Search {
  keyword: string
}

function HomePage(): ReactElement {

  const history = useHistory()

  const [useSearch, setUseSearch] = useState(false)
  const [search, setSearch] = useState<Search>({keyword: ''})
  const [searchBooks, setSearchBooks] = useState<ReviewSearchBook[]>([])

  const [books, setBooks] = useState<DisplayMainNewBook[]>()
  const [categories, setCategories] = useState<DisplayMainCategory[]>()
  const [loading, setLoading] = useState(false)

  const user = useRecoilValue(userState)
  const setPop = useSetRecoilState(popState)

  useEffect(() => {
    _initPageData()
  }, [])

  const _initPageData = async () => await requestTemplate(displayMainRequest)

  const displayMainRequest: RequestAction = {
    doOnSuccess: async () => {
      setLoading(true)

      const newBooks = await DisplayApi.getNewBooks()
      setBooks(newBooks.books)

      const displayCategories = await DisplayApi.getRandomCategories()
      setCategories(displayCategories)

      setLoading(false)
    },
    doOn400Errors: () => {
      setPop(SERVER_ERROR_DEFAULT)
    },
    doOn500Errors: () => {
      setPop(SERVER_ERROR_DEFAULT)
    },
    doErrors: () => {
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const fetchSearchBooks = async () => {
    if (search.keyword.length >= 2) {
      const searchBooks = await ReviewApi.searchBooks(search.keyword, user.token, user.deviceId);
      setSearchBooks(searchBooks.items)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchBooks.length != 0) {
      setSearchBooks([])
    }
    setSearch({
      keyword: e.target.value
    })
  }

  const onSearchPopOpened = () => {
    setUseSearch(true)
  }

  const onSearchPopClosed = () => {
    setUseSearch(false)
    search.keyword = ''
    setSearchBooks([])
  }

  const itemOnClick = async (id: string) => {
    const selectedBook = searchBooks.find(it => it.isbn == id)
    if (!selectedBook) {
      return
    }
    try {
      // 저장
      setUseSearch(false)
      history.push(`/books/${id}`)
    } catch (e) {

    }
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: false}}>
      <Plain title=''
             margin='0 1rem 2rem 1rem'>
        <Card backgroundColor='white'
              boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
          <BookSearchInputOpenButton placeholder='도서를 검색해보세요'
                                     onClick={onSearchPopOpened}/>
        </Card>
        <SearchInfo>네이버 책 API 를 이용하고 있어요</SearchInfo>
      </Plain>
      <PopupBackground active={useSearch} onClose={onSearchPopClosed}>
        <div style={{margin: `8vh 1rem 0 1rem`}}>
          <Card backgroundColor='white'
                boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <BookSearchInput placeholder='도서를 검색해보세요'
                             focused={useSearch}
                             value={search.keyword}
                             onKeyPress={async (e) => {
                               if (e.key == 'Enter') {
                                 await fetchSearchBooks()
                               }
                             }}
                             onChange={onChange}
                             autoFocus={true}/>
            {search.keyword.length != 0 && searchBooks.length == 0 ?
              <SearchGuide keyword={search.keyword} onClick={fetchSearchBooks}/>
              : null}
            <BookSearchResult books={searchBooks} itemOnClick={itemOnClick}/>
          </Card>
        </div>
      </PopupBackground>
      <SpannedCard title='새로운 도서를 살펴보세요' padding={'2rem 0 2rem 2rem'}>
        <HomeNewBookCarousel books={bookMapper(books)} loading={loading}/>
      </SpannedCard>
      <PageContent style={{margin: '3rem 1rem 3rem 1rem'}}>
        <Plain title='관심 받는 도서들이 있어요'>
          <InterestCard/>
        </Plain>
      </PageContent>
      <PageContent style={{margin: '3rem 0 3rem 0'}}>
        <Plain title='카테고리로 찾아보세요'
               titleMargin='0 2rem 0 2rem'>
          <BookCategories categories={categoryMapper(categories)} loading={loading}/>
        </Plain>
      </PageContent>
    </UserPageFrame>
  )
}

export default HomePage

const SearchInfo = styled.div`
  font-size: small;
  font-weight: lighter;
  margin-top: 4px;
  text-align: end;
`