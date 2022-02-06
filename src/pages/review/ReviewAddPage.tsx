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
import {SearchDivider} from "../../components/divider";
import {TextButton} from "../../components/buttons/TextButton";
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
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";
import {DraftReview} from "../../api/review/draftReview.utils";
import {loginModalState} from "../../states/LoginModal";
import {useHistory} from "react-router-dom";

interface Search {
  keyword: string
}

interface SelectedBook {
  selected: boolean
  book?: Book
}

const FIRST_STEP: ReviewStage = {
  stage: 1,
  displayName: '첫 단계'
}

const SECOND_STEP: ReviewStage = {
  stage: 2,
  displayName: '두번째 단계'
}

const THIRD_STEP: ReviewStage = {
  stage: 3,
  displayName: '세번째 단계'
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

function ReviewAddPage(): ReactElement {

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
  const [selectedAmount, setSelectedAmount] = useState<SelectedReviewRange>()
  const [selectableRanges, setSelectableRanges] = useState<ReviewSelectableRanges>()

  const [selectedContent, setSelectedContent] = useState<ReviewKeyword>()
  const [selectedInformative, setSelectedInformative] = useState<ReviewKeyword>()
  const [selectedReadMore, setSelectedReadMore] = useState<ReviewKeyword>()
  const [selectedSelectables, setSelectedSelectables] = useState<ReviewKeyword[]>([])

  useEffect(() => {
    const find = selectableRanges?.ranges.find(it => it.disabled == false)
    if (selectedBook && selectedBook.book && !find) {
      setPop({open: true, message: `이미 리뷰를 남겨주셨어요. 다른 책도 리뷰를 기다리고 있어요.`, color: "WARN", duration: 3000})
      setSelectedBook(initSelectedBook)
      setSearchBooks([])
      search.keyword = ''
    }
  }, [selectableRanges])

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
    setSelectedAmount(undefined)
    setSelectedBook(initSelectedBook)
    setStage(FIRST_STEP)
  }

  const onSelectorSelect = (item: SelectorItem) => () => {
    doSecondStep(item)
    setUseSelector(false)
  }

  const doSecondStep = (it: SelectedReviewRange) => {
    if (it) {
      setSelectedAmount(it)
      setStage(THIRD_STEP)
      DraftReview.setRange(it)
    }
  }

  const initSecondStep = () => {
    setSelectedAmount(undefined)
    setStage(SECOND_STEP)
    DraftReview.removeRange()
  }

  const confirmButtonName = () => {
    if (stage == FIRST_STEP) {
      return '리뷰 완료까지 두 단계 남았어요'
    }
    if (stage == SECOND_STEP) {
      return '리뷰 완료까지 한 단계 남았어요'
    }
    if (selectedAmount?.key == "READ_ALL" && selectedContent && selectedInformative) {
      return '리뷰 등록하기'
    }
    if (selectedContent && selectedInformative && selectedReadMore) {
      return '리뷰 등록하기'
    }
    if (stage == THIRD_STEP) {
      return '마지막 단계예요'
    }
    return '리뷰 등록하기'
  }

  const isConfirmButtonDisabled = () => {
    if (stage == THIRD_STEP) {
      if (selectedAmount?.key == "READ_ALL" && selectedContent && selectedInformative) {
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
    if (!selectedAmount) {
      return
    }
    if (!selectedContent) {
      return
    }
    if (!selectedInformative) {
      return
    }
    if (selectedAmount.key != "READ_ALL" && !selectedReadMore) {
      return
    }
    const review: ReviewSubmit = {
      isbn: selectedBook.book.isbn,
      range: selectedAmount.key,
      content: selectedContent.name,
      informative: selectedInformative.name,
      readMore: selectedReadMore?.name,
      selectables: selectedSelectables.map(it => it.name)
    }
    try {
      const result = await ReviewApi.submit(review, user.token, user.deviceId)
      if (result) {
        DraftReview.clear()
        setPop({open: true, message: `리뷰가 등록되었어요.`, color: "SUCCESS", duration: 3000})
        history.push(`/books/${selectedBook.book.isbn}`)
      }
    } catch (e) {
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setLoginModal({open: true, message: "로그인하면 리뷰를 완료할 수 있어요"})
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
      <Plain title='어떤 책을 읽으셨나요?'
             subTitle={selectedBook?.book ? undefined : '다 읽지 않아도 리뷰를 남길 수 있어요'}
             subTitleMargin='0 1rem 6px 1rem'
             margin='0 1rem 2rem 1rem'>
        {selectedBook?.book
          ? <Card backgroundColor='white'>
            <SelectedReviewBook book={selectedBook.book} onInitButtonClick={initFirstStep}/>
          </Card>
          : <Card backgroundColor='white'
                  boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <BookSearchInputOpenButton placeholder='리뷰 남길 책을 검색해보세요'
                                       onClick={onSearchPopOpened}/>
          </Card>}
      </Plain>
      <PopupBackground active={useSearch} onClose={onSearchPopClosed}>
        <div style={{margin: `8vh 1rem 0 1rem`}}>
          <Card backgroundColor='white'
                boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <BookSearchInput placeholder='리뷰 남길 책을 검색해보세요'
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
              <>
                <SearchDivider/>
                {search.keyword.length < 2 ?
                  <SearchGuideInfo>두 글자 이상부터 검색이 가능해요</SearchGuideInfo>
                  : <SearchGuide>
                    <TextButton onClick={fetchSearchBooks}>{`'${search.keyword}' 로 검색하기`}</TextButton>
                  </SearchGuide>}
              </>
              : null}
            <BookSearchResult books={searchBooks} itemOnClick={itemOnClick}/>
          </Card>
        </div>
      </PopupBackground>

      {/* second step components*/}
      {selectedBook?.selected
        ? <Plain title='얼마나 읽으셨나요?'
                 subTitle={selectedAmount ? undefined : '지금 읽은 만큼의 리뷰도 도움이 될 수 있어요'}
                 subTitleMargin='0 1rem 6px 1rem'
                 margin='0 1rem 2rem 1rem'>
          <Card backgroundColor='white'
                boxShadow={selectedAmount ? undefined : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <Selector selectedItem={selectedAmount}
                      placeHolder={'이만큼 읽었어요'}
                      initButtonName={'다시 고르기'}
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

      {selectedAmount
        ? <>
          <Plain title='어떤 책이었나요?'
                 subTitle='책을 설명할 수 있는 키워드를 선택해주세요'
                 subTitleMargin='0 1rem 6px 1rem'
                 margin='0 1rem 1rem 1rem'/>
          <SpannedCard padding={'2rem 0 2rem 0'}>
            <Table>
              <Row>
                <Title>내용이</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableRadioTextButtons
                      items={["💧 매우 쉬워요", "쉬워요", "보통이예요", "어려워요", "🔥 매우 어려워요"]}
                      selected={selectedContent?.index}
                      onItemClick={onContentItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>
              <Row>
                <Title>도움이</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableRadioTextButtons
                      items={["🙅 전혀 안되었어요", "🤦 안되었어요", "🤷 되었어요", "🙆 많이 되었어요"]}
                      selected={selectedInformative?.index}
                      onItemClick={onInformativeItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>
              {selectedAmount.key == 'READ_ALL' ? null : <Row>
                <Title>나머지 부분은</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableRadioTextButtons
                      items={["안 읽을래요", "필요한 부분만 읽을래요", "다 읽을래요"]}
                      selected={selectedReadMore?.index}
                      onItemClick={onReadMoreItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>}
              <Row>
                <Title>최대 3개를 선택할 수 있어요</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableCheckboxTextButtons
                      items={["✏️ 개념 위주예요", "🔬 특정 기술 위주예요", "💻 예제 코드가 꼼꼼해요", "📄 설명이 잘 되어있어요", "👍 번역이 잘 되어있어요", "🛠 오탈자가 많아요"]}
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

const SubmitButtonWrapper = styled.div`
  margin: 0 1rem 4rem 1rem;
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

const SearchGuide = styled.div`
  width: auto;
  justify-content: center;
  align-items: center;
`

const SearchGuideInfo = styled.div`
  text-align: right;
  font-size: small;
  color: grey;
`