import React, {ReactElement, useEffect, useState} from "react";
import Plain from "../../components/plain/Plain";
import styled from "styled-components";
import {getSearchBook, getSearchBooks} from "../../api/search";
import {Book, InternalSearchBook} from "../../interfaces";
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

  const [selectedHard, setSelectedHard] = useState(-1)
  const [selectedHelped, setSelectedHelped] = useState(-1)
  const [selectedLeft, setSelectedLeft] = useState(-1)
  const [selectedSpec, setSelectedSpec] = useState<number[]>([])

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
    setSelectedAmount(undefined)
    setSelectedBook(initSelectedBook)
    setStage(FIRST_STEP)
  }

  const onInitSelectAmount = () => {
    setSelectedAmount(undefined)
    setStage(SECOND_STEP)
  }

  const onAmountChange = (it: SelectedAmount) => {
    if (it) {
      setSelectedAmount(it)
      setStage(THIRD_STEP)
    }
  }

  const onSelectorSelect = (item: SelectorItem) => () => {
    onAmountChange(item)
    setUseSelector(false)
  }

  const confirmButtonName = () => {
    if (stage === FIRST_STEP) {
      return '리뷰 완료까지 두 단계 남았어요'
    }
    if (stage === SECOND_STEP) {
      return '리뷰 완료까지 한 단계 남았어요'
    }
    if (selectedHard != -1 && selectedHelped != -1 && selectedLeft != -1) {
      return '리뷰 등록하기'
    }
    if (stage === THIRD_STEP) {
      return '마지막 단계예요'
    }
    return '리뷰 등록하기'
  }

  const isConfirmButtonDisabled = () => {
    if (stage == THIRD_STEP) {
      if (selectedHard != -1 && selectedHelped != -1 && selectedLeft != -1) {
        return false
      }
    }
    if (stage != THIRD_STEP) {
      return true
    }
    return true
  }

  const onHardItemClick = (index: number) => () => {
    setSelectedHard(index)
  }

  const onHelpItemClick = (index: number) => () => {
    setSelectedHelped(index)
  }

  const onLeftItemClick = (index: number) => () => {
    setSelectedLeft(index)
  }

  const onSpecItemClick = (index: number) => () => {
    if (selectedSpec.includes(index)) {
      const removedSpec = selectedSpec.filter(it => it != index);
      setSelectedSpec(removedSpec)
    } else {
      const addSelectedSpec = selectedSpec.concat([index])
      setSelectedSpec(addSelectedSpec)
    }
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
            <SelectedReviewBook book={selectedBook.book} onInitButtonClick={onInitSelectBook}/>
          </Card>
          : <Card backgroundColor='white'
                  boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            <BookSearchInputOpenButton placeholder='리뷰 남길 책을 검색해보세요'
                                       onClick={() => setUseSearch(true)}/>
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
            <BookSearchInput placeholder='리뷰 남길 책을 검색해보세요'
                             value={search.keyword}
                             onChange={onChange}
                             autoFocus={false}/>
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
                      onInit={onInitSelectAmount}/>
          </Card>
        </Plain>
        : null}
      <PopupBackground active={useSelector} onClose={() => setUseSelector(false)}>
        <SelectorMenu items={[
          {value: 'ABSTRACT', displayName: '서론만 읽었어요', disabled: true},
          {value: 'LITTLE', displayName: '조금 읽어봤어요', disabled: true},
          {value: 'ONE_CHAPTER', displayName: '한 챕터 읽었어요', disabled: true},
          {value: 'CHAPTERS', displayName: '여러 챕터 읽었어요', disabled: false},
          {value: 'ALL', displayName: '전부 읽었어요', disabled: false},
        ]} itemOnClick={onSelectorSelect}/>
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
                      selected={selectedHard}
                      onItemClick={onHardItemClick}
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
                      selected={selectedHelped}
                      onItemClick={onHelpItemClick}
                    />
                  </ScrollElements>
                </Content>
              </Row>
              {selectedAmount.value == 'ALL' ? null : <Row>
                <Title>나머지 부분은</Title>
                <Content>
                  <ScrollElements className='scroll-hidden'>
                    <SelectableRadioTextButtons
                      items={["안 읽을래요", "필요한 부분만 읽을래요", "다 읽을래요"]}
                      selected={selectedLeft}
                      onItemClick={onLeftItemClick}
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
                      selects={selectedSpec}
                      onItemClick={onSpecItemClick}
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