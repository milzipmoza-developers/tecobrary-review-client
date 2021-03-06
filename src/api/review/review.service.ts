import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {ReviewSearchBook, ReviewSelectableRanges, ReviewSubmit} from "./review.model";
import {PageData} from "../model";
import {createHeaders} from "../header";

const searchBooks = async (keyword: string, token?: string, deviceId?: string): Promise<PageData<ReviewSearchBook>> => {
  const response = await requestSearchReviewBooks(keyword, token, deviceId)
  const {total, size, isFirst, isLast, items} = response.data.data
  return {total, size, isFirst, isLast, items}
}

const requestSearchReviewBooks = async (keyword: string, token?: string, deviceId?: string): Promise<AxiosResponse> => {
  const headers = createHeaders(token, deviceId)

  return await Api.server()
    .get("/api/reviews/search-books", {
      headers: headers,
      params: {
        keyword
      }
    })
}

const selectBook = async (selectBook: ReviewSearchBook, token?: string, deviceId?: string): Promise<boolean> => {
  const response = await requestSelectBook(selectBook, token, deviceId)
  return response.data.data
}

const requestSelectBook = async (selectBook: ReviewSearchBook, token?: string, deviceId?: string): Promise<AxiosResponse> => {
  const headers = createHeaders(token, deviceId)

  return await Api.server()
    .post("/api/reviews/select-book", {
      ...selectBook
    }, {
      headers: headers
    })
}

const getAvailableRanges = async (isbn: string, token?: string, deviceId?: string): Promise<ReviewSelectableRanges> => {
  const response = await requestAvailableRanges(isbn, token, deviceId);
  const {ranges} = response.data.data
  return {
    ranges
  }
}

const requestAvailableRanges = async (isbn: string, token?: string, deviceId?: string): Promise<AxiosResponse> => {
  const headers = createHeaders(token, deviceId)

  return await Api.server()
    .get("/api/reviews/available-ranges", {
      headers: headers,
      params: {
        isbn
      }
    })
}

const submit = async (review: ReviewSubmit, token?: string, deviceId?: string): Promise<boolean> => {
  const response = await requestSubmitReview(review, token, deviceId)
  return response.data.data
}

const requestSubmitReview = async (review: ReviewSubmit, token?: string, deviceId?: string): Promise<AxiosResponse> => {
  const headers = createHeaders(token, deviceId)

  return await Api.server()
    .post("/api/reviews/submit", {
      ...review
    }, {
      headers: headers
    })
}

export const ReviewApi = {
  searchBooks,
  selectBook,
  getAvailableRanges,
  submit
}