import {ReactElement, useEffect, useState} from "react";
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
import {useSetRecoilState} from "recoil";
import {RequestAction, requestTemplate} from "../../api";

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

function HomePage(): ReactElement {

  const [books, setBooks] = useState<DisplayMainNewBook[]>()
  const [categories, setCategories] = useState<DisplayMainCategory[]>()
  const setPop = useSetRecoilState(popState)

  useEffect(() => {
    _initPageData()
  }, [])

  const _initPageData = async () => await requestTemplate(displayMainRequest)

  const displayMainRequest: RequestAction = {
    doOnSuccess: async () => {
      const newBooks = await DisplayApi.getNewBooks()
      setBooks(newBooks.books)

      const displayCategories = await DisplayApi.getRandomCategories()
      setCategories(displayCategories)
    },
    doOn400Errors: (e) => {
      setPop(SERVER_ERROR_DEFAULT)
    },
    doOn500Errors: (e) => {
      setPop(SERVER_ERROR_DEFAULT)
    },
    doErrors: (e) => {
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: false}}>
      <SpannedCard title='새로운 도서를 살펴보세요'>
        <HomeNewBookCarousel books={bookMapper(books)}/>
      </SpannedCard>
      <PageContent style={{margin: '3rem 1rem 3rem 1rem'}}>
        <Plain title='관심 받는 도서들이 있어요'>
          <InterestCard/>
        </Plain>
      </PageContent>
      <PageContent style={{margin: '3rem 0 3rem 0'}}>
        <Plain title='카테고리로 찾아보세요'
               titleMargin='0 2rem 0 2rem'>
          <BookCategories categories={categoryMapper(categories)}/>
        </Plain>
      </PageContent>
    </UserPageFrame>
  )
}

export default HomePage
