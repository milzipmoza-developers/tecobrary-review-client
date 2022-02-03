import {CustomRadioButton} from "../buttons/CustomRadioButton";
import React from "react";
import styled from "styled-components";
import {ReviewType} from "../../types";

interface Props {
  type: ReviewType
  content?: string
  onContentChange?: () => void
  onSelect: () => void
}

const ReviewContentInput = ({type, content, onContentChange, onSelect}: Props) => {
  return (
    <>
      <CustomRadioButton marginBottom='1rem'
                         onChange={onSelect}/>
      {type == 'SHORT_REVIEW'
        ? <ReviewInputWrapper>
          <ReviewContentTextarea placeholder='리뷰를 10자 이상 입력해주세요'
                                 rows={8}
                                 value={content}
                                 onChange={onContentChange}/>
        </ReviewInputWrapper>
        : <ReviewInputWrapper>
          <ReviewUrlInput placeholder='블로그 주소를 입력해주세요'
                          value={content}
                          onChange={onContentChange}/>
        </ReviewInputWrapper>}
    </>
  )
}

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
const ReviewContentTextarea = styled.textarea`
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