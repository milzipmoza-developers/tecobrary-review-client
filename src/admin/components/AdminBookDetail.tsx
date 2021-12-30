import {TextField} from "@mui/material";
import React from "react";
import {Book} from "../api/book/book.model";
import styled from "styled-components";

interface Props {
  book?: Book | null
  readOnly: boolean
}

const AdminBookDetail = ({book, readOnly}: Props) => {
  if (!book) {
    return null
  }

  return (
    <div>
      <BookDetailWrapper>
        <BookDetailInfoWrapper>
          <TextField
            label="ISBN"
            fullWidth
            color="secondary"
            margin="normal"
            defaultValue={book.isbn}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="제목"
            fullWidth
            color="secondary"
            margin="normal"
            defaultValue={book.detail.title}
            InputProps={{
              readOnly: readOnly,
            }}
          />
          <TextField
            label="저자"
            fullWidth
            color="secondary"
            margin="normal"
            defaultValue={book.detail.author}
            InputProps={{
              readOnly: readOnly,
            }}
          />
          <TextField
            label="출판사"
            fullWidth
            color="secondary"
            margin="normal"
            defaultValue={book.detail.publisher}
            InputProps={{
              readOnly: readOnly,
            }}
          />
          <TextField
            label="출간일"
            fullWidth
            color="secondary"
            margin="normal"
            defaultValue={book.detail.publishDate}
            InputProps={{
              readOnly: readOnly,
            }}
          />
          <TextField
            label="도서 요약"
            multiline
            color="secondary"
            rows={4}
            defaultValue={book.detail.description}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: readOnly,
            }}
          />
        </BookDetailInfoWrapper>
        <BookImageWrapper>
          <Image src={book.detail.imageUrl}/>
        </BookImageWrapper>
      </BookDetailWrapper>
      <BookCategoryWrapper>
        {JSON.stringify(book.category)}
      </BookCategoryWrapper>
    </div>
  )
}

export default AdminBookDetail

const BookDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BookCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`

const BookDetailInfoWrapper = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const BookImageWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 100%; /* or any custom size */
  height: 40vh;
  object-fit: contain;
`