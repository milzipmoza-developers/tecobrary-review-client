import {TextField} from "@mui/material";
import React, {ReactElement} from "react";
import {OptionBook} from "../pages/book/AdminBookPage";
import styled from "styled-components";

interface Props {
  selectedBook: OptionBook | null,
  readonly: boolean
}

export const BookPreview = (props: Props): ReactElement => {
  const {selectedBook, readonly} = props

  if (!selectedBook) {
    return <></>
  }

  return (
    <BookInfoWrapper>
      <BookDetailWrapper>
        <TextField
          label="ISBN"
          fullWidth
          color="secondary"
          margin="normal"
          defaultValue={selectedBook?.isbn}
          InputProps={{
            readOnly: readonly,
          }}
        />
        <TextField
          label="제목"
          fullWidth
          color="secondary"
          margin="normal"
          defaultValue={selectedBook?.title}
          InputProps={{
            readOnly: readonly,
          }}
        />
        <TextField
          label="저자"
          fullWidth
          color="secondary"
          margin="normal"
          defaultValue={selectedBook?.author}
          InputProps={{
            readOnly: readonly,
          }}
        />
        <TextField
          label="출판사"
          fullWidth
          color="secondary"
          margin="normal"
          defaultValue={selectedBook?.publisher}
          InputProps={{
            readOnly: readonly,
          }}
        />
        <TextField
          label="출간일"
          fullWidth
          color="secondary"
          margin="normal"
          defaultValue={selectedBook?.publishDate}
          InputProps={{
            readOnly: readonly,
          }}
        />
        <TextField
          label="도서 요약"
          multiline
          color="secondary"
          rows={4}
          defaultValue={selectedBook?.description}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: readonly,
          }}
        />
      </BookDetailWrapper>
      <BookImageWrapper>
        <Image src={selectedBook?.imageUrl}/>
      </BookImageWrapper>
    </BookInfoWrapper>
  )
}


const BookInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
`

const BookDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;
  align-items: center;
`

const BookImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 100%; /* or any custom size */
  height: 40vh;
  object-fit: contain;
`