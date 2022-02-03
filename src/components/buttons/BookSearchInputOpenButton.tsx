import {SearchOutline} from "react-ionicons";
import React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void
}

export const BookSearchInputOpenButton = ({onClick}: Props) => {
  return (
    <SearchWrapper onClick={onClick}>
      <SearchIconWrapper>
        <SearchOutline/>
      </SearchIconWrapper>
      <SearchInput>검색어를 입력해보세요</SearchInput>
    </SearchWrapper>
  )
}

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
`

const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px 0 2px;
`

const SearchInput = styled.div`
  border: none;
  font-size: medium;
  width: 100%;
  color: grey;
`