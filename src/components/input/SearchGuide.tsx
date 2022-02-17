import {SearchDivider} from "../divider";
import {TextButton} from "../buttons/TextButton";
import React from "react";
import styled from "styled-components";

interface Props {
  keyword: string
  onClick: () => void
}

export const SearchGuide = ({keyword, onClick}: Props) => {
  return (
    <>
      <SearchDivider/>
      {keyword.length < 2
        ? <SearchGuideInfo>두 글자 이상부터 검색이 가능해요</SearchGuideInfo>
        : <Wrapper>
          <TextButton onClick={onClick}>{`'${keyword}' 로 검색하기`}</TextButton>
        </Wrapper>}
    </>
  )
}


const Wrapper = styled.div`
  width: auto;
  justify-content: center;
  align-items: center;
`

const SearchGuideInfo = styled.div`
  text-align: right;
  font-size: small;
  color: grey;
`