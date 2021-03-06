import React, {ReactElement, useEffect, useState} from "react";
import Plain from "../../components/plain/Plain";
import styled from "styled-components";
import {Book} from "../../interfaces";
import Card from "../../components/card/Card";
import {DisableableButton} from "../../components/buttons/DisableableButton";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {PopupBackground} from "../../components/background/PopupBackground";
import {BookSearchInput} from "../../components/input/BookSearchInput";
import {BookSearchInputOpenButton} from "../../components/buttons/BookSearchInputOpenButton";
import {BookSearchResult} from "../../components/list/BookSearchResult";
import {SelectedReviewBook} from "./SelectedReviewBook";
import {SelectorItem, SelectorMenu} from "../../components/selector/SelectorMenu";
import {Selector} from "../../components/selector/Selector";
import SpannedCard from "../../components/card/SpannedCard";
import {SelectableRadioTextButtons} from "../../components/buttons/SelectableRadioTextButtons";
import {SelectableCheckboxTextButtons} from "../../components/buttons/SelectableCheckboxTextButtons";
import {ReviewApi} from "../../api/review/review.service";
import {
  ReviewKeyword,
  ReviewKeywordConverter,
  ReviewSearchBook,
  ReviewSelectableRanges,
  ReviewSubmit,
  SelectedReviewRange
} from "../../api/review/review.model";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../states/User";
import {CLOSE, NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";
import {DraftReview, DraftReviewLoader} from "../../api/review/draftReview.utils";
import {loginModalState} from "../../states/LoginModal";
import {useHistory} from "react-router-dom";
import {useQueryString} from "../../hooks";
import {DisplayBookApi} from "../../api/display/display.book.service";
import {SearchGuide} from "../../components/input/SearchGuide";

interface Search {
  keyword: string
}

interface SelectedBook {
  selected: boolean
  book?: Book
}

const FIRST_STEP: ReviewStage = {
  stage: 1,
  displayName: '??? ??????'
}

const SECOND_STEP: ReviewStage = {
  stage: 2,
  displayName: '????????? ??????'
}

const THIRD_STEP: ReviewStage = {
  stage: 3,
  displayName: '????????? ??????'
}

interface ReviewStage {
  stage: number
  displayName: string
}

const initSelectedBook = (): SelectedBook => ({
  selected: false
})

const selectBook = (book: ReviewSearchBook): SelectedBook => ({
  selected: true,
  book
})

interface QueryString {
  isbn?: string
}

function ReviewAddPage(): ReactElement {

  const {isbn}: QueryString = useQueryString()

  const history = useHistory()

  const setPop = useSetRecoilState(popState)
  const user = useRecoilValue(userState)
  const setLoginModal = useSetRecoilState(loginModalState)

  const [useSearch, setUseSearch] = useState(false)
  const [search, setSearch] = useState<Search>({keyword: ''})
  const [stage, setStage] = useState<ReviewStage>(FIRST_STEP)
  const [searchBooks, setSearchBooks] = useState<ReviewSearchBook[]>([])
  const [selectedBook, setSelectedBook] = useState<SelectedBook>()

  const [useSelector, setUseSelector] = useState(false)
  const [selectedRange, setSelectedRange] = useState<SelectedReviewRange>()
  const [selectableRanges, setSelectableRanges] = useState<ReviewSelectableRanges>()

  const [selectedContent, setSelectedContent] = useState<ReviewKeyword>()
  const [selectedInformative, setSelectedInformative] = useState<ReviewKeyword>()
  const [selectedReadMore, setSelectedReadMore] = useState<ReviewKeyword>()
  const [selectedSelectables, setSelectedSelectables] = useState<ReviewKeyword[]>([])

  useEffect(() => {
    if (isbn) {
      (async () => {
        await loadSelectedBook()
      })()
      return
    }

    if (DraftReview.hasAny() && stage == FIRST_STEP) {
      setPop({
        open: true,
        message: "???????????? ????????? ?????????.",
        color: "INFO",
        duration: 5000,
        actionButton: {
          name: "????????????",
          onClick: async () => {
            await loadDraftReview()
            setPop(CLOSE)
          }
        }
      })
      return
    }
  }, [])

  useEffect(() => {
    if (!selectableRanges || selectableRanges?.ranges.length == 0) {
      return
    }
    const find = selectableRanges.ranges.find(it => !it.disabled)
    if (selectedBook && selectedBook.book && !find) {
      setPop({open: true, message: `???????????? ?????? ?????? ????????? ????????? ??????????????????.`, color: "WARN", duration: 3000})
      setSelectedBook(initSelectedBook)
      setSearchBooks([])
      search.keyword = ''
    }
  }, [selectableRanges])

  const loadSelectedBook = async () => {
    if (isbn) {
      const foundBook = await DisplayBookApi.getBook(isbn, user.deviceId, user.token)

      setSelectedBook(selectBook({
        isbn: foundBook.book.isbn,
        title: foundBook.book.title,
        publisher: foundBook.book.publisher,
        author: foundBook.book.author,
        imageUrl: foundBook.book.imageUrl,
        description: foundBook.book.description,
        publishDate: foundBook.book.publishDate,
        tags: foundBook.tags.map(it => ({
          name: it.name,
          colorCode: it.colorCode
        }))
      }))
      setStage(SECOND_STEP)

      const reviewSelectableRanges = await ReviewApi.getAvailableRanges(foundBook.book.isbn, user.token, user.deviceId);
      setSelectableRanges(reviewSelectableRanges)
      return
    }
  }

  const loadDraftReview = async () => {
    const loadedBook = DraftReviewLoader.loadBook()
    if (!loadedBook) {
      return
    }
    setSelectedBook(selectBook(loadedBook))
    setStage(SECOND_STEP)

    const reviewSelectableRanges = await ReviewApi.getAvailableRanges(loadedBook.isbn, user.token, user.deviceId);
    setSelectableRanges(reviewSelectableRanges)

    const loadedRange = DraftReviewLoader.loadRange()
    if (!loadedRange) {
      return
    }
    const reviewRange = reviewSelectableRanges.ranges.find(it => it.key == loadedRange.key);
    if (reviewRange && reviewRange.disabled) {
      return
    }
    setSelectedRange(loadedRange)
    setStage(THIRD_STEP)

    const loadKeywordContent = DraftReviewLoader.loadKeywordContent()
    if (loadKeywordContent) {
      setSelectedContent(loadKeywordContent)
    }
    const loadKeywordInformative = DraftReviewLoader.loadKeywordInformative()
    if (loadKeywordInformative) {
      setSelectedInformative(loadKeywordInformative)
    }
    const loadKeywordReadMore = DraftReviewLoader.loadKeywordReadMore()
    if (loadKeywordReadMore) {
      setSelectedReadMore(loadKeywordReadMore)
    }
    const reviewKeywords = DraftReviewLoader.loadKeywordSelectables()
    if (reviewKeywords) {
      setSelectedSelectables(reviewKeywords)
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

  const itemOnClick = async (id: string) => {
    const selectedBook = searchBooks.find(it => it.isbn == id)
    if (!selectedBook) {
      return
    }
    await ReviewApi.selectBook(selectedBook, user.token, user.deviceId)
    setUseSearch(false)
    doFirstStep(selectedBook)
    const reviewSelectableRanges = await ReviewApi.getAvailableRanges(selectedBook.isbn, user.token, user.deviceId);
    setSelectableRanges(reviewSelectableRanges)
  }

  const doFirstStep = (book: ReviewSearchBook) => {
    setSelectedBook(selectBook(book))
    setStage(SECOND_STEP)
    DraftReview.setBook(book)
  }

  const initFirstStep = () => {
    DraftReview.removeKeywords()
    DraftReview.removeRange()
    DraftReview.removeBook()
    setSearchBooks([])
    search.keyword = ''
    setSelectedRange(undefined)
    setSelectedBook(initSelectedBook)
    initThirdStep()
    setStage(FIRST_STEP)
  }

  const onSelectorSelect = (item: SelectorItem) => () => {
    doSecondStep(item)
    setUseSelector(false)
  }

  const doSecondStep = (it: SelectedReviewRange) => {
    if (it) {
      setSelectedRange(it)
      setStage(THIRD_STEP)
      DraftReview.setRange(it)
    }
  }

  const initSecondStep = () => {
    setSelectedRange(undefined)
    setStage(SECOND_STEP)
    initThirdStep()
    DraftReview.removeRange()
  }

  const initThirdStep = () => {
    setSelectedContent(undefined)
    setSelectedInformative(undefined)
    setSelectedReadMore(undefined)
    setSelectedSelectables([])
  }

  const confirmButtonName = () => {
    if (stage == FIRST_STEP) {
      return '?????? ???????????? ??? ?????? ????????????'
    }
    if (stage == SECOND_STEP) {
      return '?????? ???????????? ??? ?????? ????????????'
    }
    if (selectedRange?.key == "READ_ALL" && selectedContent && selectedInformative) {
      return '?????? ????????????'
    }
    if (selectedContent && selectedInformative && selectedReadMore) {
      return '?????? ????????????'
    }
    if (stage == THIRD_STEP) {
      return '????????? ????????????'
    }
    return '?????? ????????????'
  }

  const isConfirmButtonDisabled = () => {
    if (stage == THIRD_STEP) {
      if (selectedRange?.key == "READ_ALL" && selectedContent && selectedInformative) {
        return false
      }
      if (selectedContent && selectedInformative && selectedReadMore) {
        return false
      }
    }
    if (stage != THIRD_STEP) {
      return true
    }
    return true
  }

  const onContentItemClick = (index: number) => () => {
    const selectedItem = {
      index: index,
      name: ReviewKeywordConverter.convertContent(index)
    }
    setSelectedContent(selectedItem)
    DraftReview.setKeywordContent(selectedItem)
  }

  const onInformativeItemClick = (index: number) => () => {
    const selectedItem = {
      index: index,
      name: ReviewKeywordConverter.convertInformative(index)
    }
    setSelectedInformative(selectedItem)
    DraftReview.setKeywordInformative(selectedItem)
  }

  const onReadMoreItemClick = (index: number) => () => {
    const selectedItem = {
      index: index,
      name: ReviewKeywordConverter.convertReadMore(index)
    }
    setSelectedReadMore(selectedItem)
    DraftReview.setKeywordReadMore(selectedItem)
  }

  const onSelectableItemClick = (index: number) => () => {
    const selectedItem = {
      index: index,
      name: ReviewKeywordConverter.convertSelectables(index)
    }
    if (selectedSelectables.find(it => it.index == index)) {
      const removedSpec = selectedSelectables.filter(it => it.index != index)
      DraftReview.setKeywordSelectables(removedSpec)
      setSelectedSelectables(removedSpec)
    } else {
      if (selectedSelectables.length > 2) {
        return
      }
      const addSelectedSpec = selectedSelectables.concat([selectedItem])
      DraftReview.setKeywordSelectables(addSelectedSpec)
      setSelectedSelectables(addSelectedSpec)
    }
  }

  const onSubmit = async () => {
    if (!selectedBook?.selected || !selectedBook.book) {
      return
    }
    if (!selectedRange) {
      return
    }
    if (!selectedContent) {
      return
    }
    if (!selectedInformative) {
      return
    }
    if (selectedRange.key != "READ_ALL" && !selectedReadMore) {
      return
    }
    const review: ReviewSubmit = {
      isbn: selectedBook.book.isbn,
      range: selectedRange.key,
      content: selectedContent.name,
      informative: selectedInformative.name,
      readMore: selectedReadMore?.name,
      selectables: selectedSelectables.map(it => it.name)
    }
    try {
      const result = await ReviewApi.submit(review, user.token, user.deviceId)
      if (result) {
        DraftReview.clear()
        setPop({open: true, message: `????????? ??????????????????.`, color: "SUCCESS", duration: 3000})
        history.replace(`/books/${selectedBook.book.isbn}`)
      }
    } catch (e) {
      if (e.response && e.response.status == 401) {
        setLoginModal({open: true, message: "??????????????? ????????? ????????? ??? ?????????"})
        return
      }
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: `${e.response.data.message}`, open: true, duration: 3000, color: "WARN"})
        return
      }

      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const onSearchPopClosed = () => {
    setUseSearch(false)
    search.keyword = ''
    setSearchBooks([])
  }

  const onSearchPopOpened = () => {
    setUseSearch(true)
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      {/* first step components*/}
      <Plain title='?????? ?????? ????????????????'
             subTitle={selectedBook?.book ? undefined : '??? ?????? ????????? ????????? ?????? ??? ?????????'}
             subTitleMargin='0 1rem 6px 1rem'
             margin='0 1rem 2rem 1rem'>
        {selectedBook?.book
          ? <Card backgroundColor='white'>
            <SelectedReviewBook book={selectedBook.book} onInitButtonClick={initFirstStep}/>
          </Card>
          : <Card backgroundColor='white'
                  boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <BookSearchInputOpenButton placeholder='?????? ?????? ?????? ??????????????????'
                                       onClick={onSearchPopOpened}/>
          </Card>}
      </Plain>
      <PopupBackground active={useSearch} onClose={onSearchPopClosed}>
        <div style={{margin: `8vh 1rem 0 1rem`}}>
          <Card backgroundColor='white'
                boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <BookSearchInput placeholder='?????? ?????? ?????? ??????????????????'
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

      {/* second step components*/}
      {selectedBook?.selected
        ? <Plain title='????????? ????????????????'
                 subTitle={selectedRange ? undefined : '?????? ?????? ????????? ????????? ????????? ??? ??? ?????????'}
                 subTitleMargin='0 1rem 6px 1rem'
                 margin='0 1rem 2rem 1rem'>
          <Card backgroundColor='white'
                boxShadow={selectedRange ? undefined : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <Selector selectedItem={selectedRange}
                      placeHolder={'????????? ????????????'}
                      initButtonName={'?????? ?????????'}
                      onOpen={() => setUseSelector(true)}
                      onInit={initSecondStep}/>
          </Card>
        </Plain>
        : null}
      <PopupBackground active={useSelector} onClose={() => setUseSelector(false)}>
        <SelectorMenu items={selectableRanges?.ranges.map(range => ({
          key: range.key,
          displayName: range.displayName,
          disabled: range.disabled
        }))} itemOnClick={onSelectorSelect}/>
      </PopupBackground>

      {selectedRange
        ? <>
          <Plain title='?????? ????????????????'
                 subTitle='?????? ????????? ??? ?????? ???????????? ??????????????????'
                 subTitleMargin='0 1rem 6px 1rem'
                 margin='0 1rem 1rem 1rem'/>
          <SpannedCard padding={'2rem 0 2rem 0'}>
            <Table>
              <Row>
                <Title>?????????</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableRadioTextButtons
                      items={["???? ?????? ?????????", "?????????", "???????????????", "????????????", "???? ?????? ????????????"]}
                      selected={selectedContent?.index}
                      onItemClick={onContentItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>
              <Row>
                <Title>?????????</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableRadioTextButtons
                      items={["???? ?????? ???????????????", "???? ???????????????", "???? ????????????", "???? ?????? ????????????"]}
                      selected={selectedInformative?.index}
                      onItemClick={onInformativeItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>
              {selectedRange.key == 'READ_ALL' ? null : <Row>
                <Title>????????? ?????????</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableRadioTextButtons
                      items={["??? ????????????", "????????? ????????? ????????????", "??? ????????????"]}
                      selected={selectedReadMore?.index}
                      onItemClick={onReadMoreItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>}
              <Row>
                <Title>?????? 3?????? ????????? ??? ?????????</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableCheckboxTextButtons
                      items={["?????? ?????? ????????????", "???? ?????? ?????? ????????????", "???? ?????? ????????? ????????????", "???? ????????? ??? ???????????????", "???? ????????? ??? ???????????????", "???? ???????????? ?????????"]}
                      selects={selectedSelectables.map(it => it.index)}
                      onItemClick={onSelectableItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>
            </Table>
          </SpannedCard>
        </>
        : null}

      <SubmitButtonWrapper>
        <Plain>
          <DisableableButton name={confirmButtonName()}
                             disabled={isConfirmButtonDisabled()}
                             onClick={onSubmit}/>
        </Plain>
      </SubmitButtonWrapper>
    </UserPageFrame>
  )
}

  export default ReviewAddPage

  const SubmitButtonWrapper
=
  styled.div`
  margin: 0 1rem 4rem 1rem;
  `

  const Table
=
  styled.div`
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  `

  const Row
=
  styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  `

  const Content
=
  styled.div`
  height: fit-content;
  width: auto;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  `

  const ScrollElements
=
  styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  width: fit-content;
  padding: 4px 10px 4px 10px;
  `

  const Title
=
  styled.div`
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