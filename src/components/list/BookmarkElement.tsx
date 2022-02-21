import React, {ReactElement} from "react";
import {TagBadges} from "../badges/TagBadges";
import {TimeAGoBadge} from "../badges/TimeAGoBadge";
import {TextButton} from "../buttons/TextButton";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {Tag} from "../../interfaces";

interface Props {
  isbn: string;
  imageUrl: string;
  title: string;
  tags: Tag[];
  markDateTime: string;
}

export const BookmarkElement = (props: Props): ReactElement => {
  const history = useHistory();

  const {isbn, imageUrl, title, tags, markDateTime} = props

  return (
    <ElementWrapper onClick={() => {
      history.push(`/books/${isbn}`);
    }}>
      <ElementImage src={imageUrl}/>
      <ElementBookInfoWrapper>
        <Title>{title}</Title>
        <TagBadges tags={tags} size='small' maxLength={3}/>
        <TimeWrapper>
          <TimeAGoBadge time={markDateTime}/>
        </TimeWrapper>
        <ReviewButtonWrapper>
          <TextButton onClick={(e) => {
            e.stopPropagation();
            history.push(`/reviews?isbn=${isbn}`)
          }}>리뷰 남기기</TextButton>
        </ReviewButtonWrapper>
      </ElementBookInfoWrapper>
    </ElementWrapper>
  );
};

const ElementWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 4rem;
`

const Margin = styled.div`
  height: 1rem;
  width: 100%;
`

const ElementImage = styled.img`
  width: 4rem;
  border-radius: 10%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin-right: 1rem;
`

const ElementBookInfoWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: small;
  margin-top: 6px;
`

const TimeWrapper = styled.div`
  top: 0;
  right: 0;
  position: absolute;
`

const ReviewButtonWrapper = styled.div`
  bottom: 4px;
  right: 0;
  position: absolute;
  z-index: 100;
`