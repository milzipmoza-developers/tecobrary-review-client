import React, {ReactElement} from "react";
import {TagBadges} from "../../components/badges/TagBadges";
import {Divider} from "@mui/material";
import styled from "styled-components";
import {TimelineBook, TimelineMember, TimelineReview} from "../../model/timeline";
import {useHistory} from "react-router-dom";
import {TextIcon} from "./TextIcon";

interface Props {
  member: TimelineMember
  book: TimelineBook
  review: TimelineReview
}

export const TimelineElement = ({member, book, review}: Props): ReactElement => {

  const history = useHistory();

  return (
    <TimelineElementWrapper>
      <TimelineMemberElement>
        <MemberProfileImage src={member.profileImageUrl}/>
        <div>{member.name}</div>
      </TimelineMemberElement>
      <TimelineBookElement>
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
          {review.readMore
            ? <div style={{margin: "4px 0"}}>
              나머지는<TextIcon>{review.readMore.displayName}</TextIcon>
            </div>
            : null}
          <div style={{margin: "4px 0", display: "flex", flexDirection: "row"}}>
            <div style={{margin: "4px 0"}}>이 책은</div>
            <div style={{flex: 1, lineHeight: "34px"}}>
              {review.selectables.map((it, index) => (<TextIcon key={index}>{it.displayName}</TextIcon>))}
            </div>
          </div>
        </div>
      </TimelineBookElement>
    </TimelineElementWrapper>
  );
}


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

const TimelineBookElement = styled.div`
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