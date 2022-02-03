import React, {ReactElement, useEffect, useState} from "react";
import Plain from "../../components/plain/Plain";
import styled from "styled-components";
import {getSearchBook, getSearchBooks} from "../../api/search";
import {Book, InternalSearchBook} from "../../interfaces";
import Card from "../../components/card/Card";
import Selector from "../../components/selector/Selector";
import {ReviewType} from "../../types";
import {CustomRadioButton} from "../../components/buttons/CustomRadioButton";
import {DisableableButton} from "../../components/buttons/DisableableButton";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {PopupBackground} from "../../components/background/PopupBackground";
import {BookSearchInput} from "../../components/input/BookSearchInput";
import {BookSearchInputOpenButton} from "../../components/buttons/BookSearchInputOpenButton";
import {BookSearchResult} from "../../components/list/BookSearchResult";
import {SelectedReviewBook} from "./SelectedReviewBook";

interface Search {
  keyword: string
}

interface SelectedBook {
  selected: boolean
  book?: Book
}

interface SelectedAmount {
  value: string
  displayName: string
}

interface SelectedReview {
  type: ReviewType
  url?: string
  content?: string
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

const initSelectedReview = (): SelectedReview => ({
  type: 'SHORT_REVIEW'
})

const selectBook = (book: Book): SelectedBook => ({
  selected: true,
  book
})

function ReviewAddPage(): ReactElement {

  const [useSearch, setUseSearch] = useState(false)
  const [search, setSearch] = useState<Search>({keyword: ''})
  const [stage, setStage] = useState<ReviewStage>(FIRST_STEP)
  const [searchBooks, setSearchBooks] = useState<InternalSearchBook[]>([])
  const [selectedBook, setSelectedBook] = useState<SelectedBook>()

  const [useSelector, setUseSelector] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<SelectedAmount>()
  const [selectedReview, setSelectedReview] = useState(initSelectedReview)

  useEffect(() => {
    if (search.keyword.length < 2) {
      setSearchBooks([])
    }
    if (search.keyword.length >= 2) {
      setSearchBooks(getSearchBooks)
    }
  }, [search])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      keyword: e.target.value
    })
  }

  const onReviewUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReview({
      type: selectedReview.type,
      url: e.target.value
    })
  }

  const onReviewContentChange = (e: any) => {
    setSelectedReview({
      type: selectedReview.type,
      content: e.target.value
    })
  }

  const itemOnClick = (id: string) => {
    const searchBook = getSearchBook(id);
    if (!searchBook) {
      throw Error('선택한 책이 존재하지 않습니다.')
    }
    setUseSearch(false)
    setSelectedBook(selectBook(searchBook))
    setStage(SECOND_STEP)
  }

  const onInitSelectBook = () => {
    setSearchBooks([])
    search.keyword = ''
    setSelectedReview(initSelectedReview)
    setSelectedAmount(undefined)
    setSelectedBook(initSelectedBook)
    setStage(FIRST_STEP)
  }

  const onInitSelectAmount = () => {
    setSelectedReview(initSelectedReview)
    setSelectedAmount(undefined)
    setStage(SECOND_STEP)
  }

  const onAmountChange = (it: SelectedAmount | null) => {
    if (it) {
      setSelectedAmount(it)
      setStage(THIRD_STEP)
    }
  }

  const onReviewTypeChange = (it: ReviewType) => {
    setSelectedReview({
      ...selectedReview,
      type: it
    })
  }

  const confirmButtonName = () => {
    if (stage === FIRST_STEP) {
      return '리뷰 완료까지 두 단계 남았어요'
    }
    if (stage === SECOND_STEP) {
      return '리뷰 완료까지 한 단계 남았어요'
    }
    if ((selectedReview.content !== undefined && selectedReview.content.length > 10)
      || (selectedReview.url !== undefined && selectedReview.url.length > 10)) {
      return '리뷰 등록하기'
    }
    if (stage === THIRD_STEP) {
      return '마지막 단계예요'
    }
    return '리뷰 등록하기'
  }

  const isConfirmButtonDisabled = () => {
    if (stage == THIRD_STEP) {
      if ((selectedReview.content != undefined && selectedReview.content.length > 10)
        || (selectedReview.url != undefined && selectedReview.url.length > 10)) {
        return false
      }
    }
    if (stage != THIRD_STEP) {
      return true
    }
    return true
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <Plain title='도서를 검색해보세요'
             subTitle={selectedBook?.book ? undefined : '다 읽지 않아도 리뷰를 남길 수 있어요'}
             subTitleMargin='0 1rem 6px 1rem'
             margin='0 1rem 2rem 1rem'>
        {selectedBook?.book
          ? <Card backgroundColor='white'>
            <SelectedReviewBook book={selectedBook.book} onInitButtonClick={onInitSelectBook}/>
          </Card>
          : <Card backgroundColor='white'
                  boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <BookSearchInputOpenButton onClick={() => setUseSearch(true)}/>
          </Card>}
      </Plain>
      <PopupBackground active={useSearch} onClose={() => {
        setUseSearch(false)
        search.keyword = ''
        setSearchBooks([])
      }}>
        <div style={{margin: `8vh 1rem 0 1rem`}}>
          <Card backgroundColor='white'
                boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            <BookSearchInput placeholder='검색어를 입력해보세요'
                             value={search.keyword}
                             onChange={onChange}
                             autoFocus={true}/>
            <BookSearchResult books={searchBooks} itemOnClick={itemOnClick}/>
          </Card>
        </div>
      </PopupBackground>

      {selectedBook?.selected
        ? <Plain title='얼마나 읽으셨나요?'
                 subTitle={selectedAmount ? undefined : '지금 읽은 만큼의 리뷰도 도움이 될 수 있어요'}
                 subTitleMargin='0 1rem 6px 1rem'
                 margin='0 1rem 2rem 1rem'>
          <Card backgroundColor='white'
                boxShadow={selectedAmount ? undefined : 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
            {selectedAmount ?
              <ReadAmountWrapper>
                <ReadAmountSelected>{selectedAmount.displayName}</ReadAmountSelected>
                <SelectInitButton onClick={onInitSelectAmount}>다시 고르기</SelectInitButton>
              </ReadAmountWrapper>
              : <Selector placeholder='이만큼 읽었어요'
                          items={[
                            {value: 'ABSTRACT', displayName: '서론만 읽었어요'},
                            {value: 'LITTLE', displayName: '조금 읽어봤어요'},
                            {value: 'ONE_CHAPTER', displayName: '한 챕터 읽었어요'},
                            {value: 'CHAPTERS', displayName: '여러 챕터 읽었어요'},
                            {value: 'ALL', displayName: '전부 읽었어요'},
                          ]}
                          onChange={onAmountChange}/>}
          </Card>
        </Plain>
        : null}

      {selectedAmount
        ? <Plain title='어떤 책이었나요?'
                 subTitle='책을 설명할 수 있는 키워드를 선택해주세요'
                 subTitleMargin='0 1rem 6px 1rem'
                 margin='0 1rem 2rem 1rem'>
          <Card backgroundColor='white'
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <CustomRadioButton marginBottom='1rem'
                               onChange={onReviewTypeChange}/>
            {selectedReview.type === 'SHORT_REVIEW'
              ? <ReviewInputWrapper>
                <ReviewContentInput placeholder='리뷰를 10자 이상 입력해주세요'
                                    rows={8}
                                    value={selectedReview.content}
                                    onChange={onReviewContentChange}/>
              </ReviewInputWrapper>
              : <ReviewInputWrapper>
                <ReviewUrlInput placeholder='블로그 주소를 입력해주세요'
                                value={selectedReview.content}
                                onChange={onReviewUrlChange}/>
              </ReviewInputWrapper>}
          </Card>
        </Plain>
        : null}
      <SubmitButtonWrapper>
        <Plain>
          <DisableableButton name={confirmButtonName()}
                             disabled={isConfirmButtonDisabled()}
                             onClick={() => console.log('제출하기')}/>
        </Plain>
      </SubmitButtonWrapper>
    </UserPageFrame>
  )
}

export default ReviewAddPage

const SubmitButtonWrapper = styled.div`
  margin: 0 1rem 4rem 1rem;
`

const SelectInitButton = styled.div`
  background-color: black;
  color: white;
  width: fit-content;
  font-size: x-small;
  padding: 4px;
  border-radius: 1rem;
  margin-left: auto;
`

const ReadAmountWrapper = styled.div`
  width: auto;
  height: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ReadAmountSelected = styled.div`
  font-size: large;
`

const ReviewInputWrapper = styled.div`
  width: auto;
  height: fit-content;
  padding: 1rem;
`

const ReviewUrlInput = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: medium;
  width: 100%;

  &:focus {
    outline: none;
  }
`
const ReviewContentInput = styled.textarea`
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  font-size: medium;
  width: 100%;
  resize: none;
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', sans-serif;

  &:focus {
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }
`