import React, {ReactElement} from "react";
import {UserPageFrame} from "../components/page/UserPageFrame";
import styled from "styled-components";
import Plain from "../components/plain/Plain";
import {ReviewContentItem} from "../model/review/ReviewContentItem";
import {ReviewInformativeItem} from "../model/review/ReviewInformativeItem";
import {ReviewSelectableItem} from "../model/review/ReviewSelectableItem";
import {ReviewReadMoreItem} from "../model/review/ReviewReadMoreItem";
import {Divider} from "@mui/material";
import {ReviewRange} from "../model/review/ReviewRange";
import {TagBadges} from "../components/badges/TagBadges";
import {Tag} from "../interfaces";
import {useHistory} from "react-router-dom";

interface Props {
  children: string
}

const TextIcon = ({children}: Props) => (
  <TextWrapper>
    <TextIconText>{children}</TextIconText>
  </TextWrapper>
)


const TextWrapper = styled.div`
  background: rgb(39, 54, 60);
  padding: 2px 6px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 4px;
  border: 1px solid rgb(39, 54, 60);
  width: fit-content;
  height: 24px;
`

const TextIconText = styled.div`
  color: white;
  font-size: medium;
  width: max-content;
`

interface TimelineMember {
  no: string
  name: string
  profileImageUrl: string
}

interface TimelineBook {
  isbn: string
  title: string
  imageUrl: string
  tags: Tag[]
}

interface TimelineReview {
  range: ReviewRange
  content: ReviewContentItem
  informative: ReviewInformativeItem
  readMore: ReviewReadMoreItem
  selectables: ReviewSelectableItem[]
}

interface TimelineElement {
  member: TimelineMember
  book: TimelineBook
  review: TimelineReview
}

function TimelinePage(): ReactElement {

  const data: TimelineElement = {
    member: {
      no: "aa",
      name: "TheDevLuffy",
      profileImageUrl: "https://avatars.githubusercontent.com/u/52121827?v=4"
    },
    book: {
      isbn: "9788998139766",
      title: "객체지향의 사실과 오해",
      imageUrl: "https://bookthumb-phinf.pstatic.net/cover/091/459/09145968.jpg?type=m1&udate=20211002",
      tags: [
        {
          name: "객체지향",
          colorCode: "#FF00DD"
        },
        {
          name: "객체지향",
          colorCode: "#FF00DD"
        },
        {
          name: "객체지향",
          colorCode: "#FF00DD"
        },
      ]
    },
    review: {
      range: new ReviewRange("A_LITTLE", 0),
      content: new ReviewContentItem("VERY_EASY", 0),
      informative: new ReviewInformativeItem("YES", 0),
      readMore: new ReviewReadMoreItem("NEEDED", 0),
      selectables: [
        new ReviewSelectableItem("GOOD_TRANSLATION", 0),
        new ReviewSelectableItem("GOOD_CODE", 0),
        new ReviewSelectableItem("GOOD_EXPLANATION", 0),
      ]
    }
  }

  const {member, book, review} = data;
  const history = useHistory();

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <Plain title='모든 리뷰를 모아볼 수 있어요'
             margin='0 1rem'>
        <TimelineElementWrapper>
          <TimelineMemberElement>
            <MemberProfileImage src={member.profileImageUrl}/>
            <div>{member.name}</div>
          </TimelineMemberElement>
          <TimelineElement>
            <div style={{marginBottom: "1rem", display: "flex", flexDirection: "row"}}
                 onClick={() => history.push(`/books/${book.isbn}`)}>
              <BookCoverImageWrapper>
                <BookCoverImage
                  src={book.imageUrl}/>
              </BookCoverImageWrapper>
              <BookDescriptionWrapper>
                <div><b>{book.title}</b>을(를) {review.range.displayName}</div>
                <div>
                  <div style={{width: "auto"}}/>
                  <TagBadges tags={book.tags} size={"small"}/>
                </div>
              </BookDescriptionWrapper>
            </div>
            <Divider/>
            <div style={{marginTop: "1rem"}}>
              <div style={{margin: "4px 0"}}>
                내용은<TextIcon>{review.content.displayName}</TextIcon>
                도움이<TextIcon>{review.informative.displayName}</TextIcon>
              </div>
              <div style={{margin: "4px 0"}}>
                나머지 부분은<TextIcon>{review.readMore.displayName}</TextIcon>
              </div>
              <div style={{margin: "4px 0", display: "flex", flexDirection: "row"}}>
                <div style={{margin: "4px 0"}}>이 책은</div>
                <div style={{flex: 1, lineHeight: "34px"}}>
                  {review.selectables.map((it, index) => (<TextIcon key={index}>{it.displayName}</TextIcon>))}
                </div>
              </div>
            </div>
          </TimelineElement>
        </TimelineElementWrapper>
        <TimelineElementWrapper>
          <TimelineMemberElement>
            <MemberProfileImage src={member.profileImageUrl}/>
          </TimelineMemberElement>
          <TimelineElement>
            <div style={{marginBottom: "1rem", display: "flex", flexDirection: "row"}}
                 onClick={() => history.push(`/books/${book.isbn}`)}>
              <BookCoverImageWrapper>
                <BookCoverImage
                  src={book.imageUrl}/>
              </BookCoverImageWrapper>
              <BookDescriptionWrapper>
                <div><b>{book.title}</b>을(를) {review.range.displayName}</div>
                <div>
                  <div style={{width: "auto"}}/>
                  <TagBadges tags={book.tags} size={"small"}/>
                </div>
              </BookDescriptionWrapper>
            </div>
            <Divider/>
            <div style={{marginTop: "1rem"}}>
              <div style={{margin: "4px 0"}}>
                내용은<TextIcon>{review.content.displayName}</TextIcon>
                도움이<TextIcon>{review.informative.displayName}</TextIcon>
              </div>
              <div style={{margin: "4px 0"}}>
                나머지 부분은<TextIcon>{review.readMore.displayName}</TextIcon>
              </div>
              <div style={{margin: "4px 0", display: "flex", flexDirection: "row"}}>
                <div style={{margin: "4px 0"}}>이 책은</div>
                <div style={{flex: 1, lineHeight: "34px"}}>
                  {review.selectables.map((it, index) => (<TextIcon key={index}>{it.displayName}</TextIcon>))}
                </div>
              </div>
            </div>
          </TimelineElement>
        </TimelineElementWrapper>
      </Plain>
    </UserPageFrame>
  )
}

export default TimelinePage

const TimelineElementWrapper = styled.div`
  margin: 1rem 0;
`

const TimelineMemberElement = styled.div`
  padding: 0 1rem;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MemberProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 8px;
`

const TimelineElement = styled.div`
  background: white;
  border-radius: 1rem;
  width: auto;
  height: fit-content;
  padding: 1rem;
`

const BookCoverImageWrapper = styled.div`
  max-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BookCoverImage = styled.img`
  width: 100%;
`

const BookDescriptionWrapper = styled.div`
  width: 100%;
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`