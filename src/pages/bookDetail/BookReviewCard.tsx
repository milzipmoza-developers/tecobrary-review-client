import React, {ReactElement} from "react";
import {ReviewTypeBadge} from "../../components/badges/ReviewTypeBadge";
import {ScoreBadge} from "../../components/badges/ScoreBadge";
import Card from "../../components/card/Card";
import styled from "styled-components";
import {BookReview} from "../../interfaces";

interface Props {
  isbn?: string
  slice?: number
  button?: boolean
  counts?: number
  reviews: BookReview[]
}

function BookReviewCard({isbn, slice, counts, button, reviews}: Props): ReactElement {

  const reviews2 = slice ? reviews.slice(0, 3) : reviews

  const BookReviewList = () => {

    if (reviews.length == 0) {
      return (
        <EmptyReviewWrapper>
          <div>첫 번째 리뷰를 작성해보아요</div>
        </EmptyReviewWrapper>
      )
    }

    return (<>
      {reviews2.map((bookReview: BookReview, index: number) => (
        <Wrapper key={index}>
          <ProfileWrapper>
            <ProfileImage src={bookReview.member.profileUrl}/>
          </ProfileWrapper>
          <ReviewWrapper>
            <FirstLine>
              <div style={{fontWeight: 'bold', fontSize: 'medium'}}>{bookReview.member.name}</div>
              <ReviewTypeBadge type={bookReview.reviewType} link={bookReview.blogContentUrl}/>
            </FirstLine>
            <SecondLine>
              <ScoreBadge rate={bookReview.rate}/>
            </SecondLine>
            <div>{bookReview.content}</div>
          </ReviewWrapper>
        </Wrapper>
      ))}
    </>)
  }

  return (
    <Card backgroundColor='white'
          buttonText={counts && counts > 3 ? '더보기' : undefined}
          buttonTo={button ? `/books/${isbn}/reviews` : undefined}
          boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
      <BookReviewList/>
    </Card>
  )
}

export default BookReviewCard

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 2rem;
`

const ProfileWrapper = styled.div`
  margin-right: 1rem;
  width: 4rem;
  height: 4rem;
`

const ProfileImage = styled.img`
  border-radius: 50%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
`

const ReviewWrapper = styled.div`
  width: 100%;
`

const FirstLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`

const SecondLine = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`

const EmptyReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`