import React, {useEffect, useRef} from "react";
import {SearchOutline} from "react-ionicons";
import styled from "styled-components";

interface Props {
  value: string
  placeholder: string
  autoFocus?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
}

export const BookSearchInput = (props: Props) => {

  const {value, placeholder, autoFocus, onChange, onFocus} = props
  const searchElement = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (searchElement.current) {
      searchElement.current.focus()
    }
  }, []);


  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchOutline/>
      </SearchIconWrapper>
      <SearchInput ref={searchElement}
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   onFocus={onFocus}
                   autoFocus={autoFocus}/>
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

const SearchInput = styled.input`
  border: none;
  font-size: medium;
  width: 100%;

  &:focus {
    outline: none;
  }
`