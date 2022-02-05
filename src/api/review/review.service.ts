import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {ReviewSearchBook} from "./review.model";
import {PageData} from "../model";

const searchBooks = async (keyword: string, token?: string, deviceId?: string): Promise<PageData<ReviewSearchBook>> => {
  const response = await requestSearchReviewBooks(keyword, token, deviceId)
  const {total, size, isFirst, isLast, items} = response.data.data
  return {total, size, isFirst, isLast, items}
}

const requestSearchReviewBooks = async (keyword: string, token?: string, deviceId?: string): Promise<AxiosResponse> => {
  const headers: TecobraryHeaders = {}
  if (token) {
    headers["Authorization"] = `token ${token}`
  }
  if (deviceId) {
    headers["X-TECOBRARY-DEVICE-ID"] = deviceId
  }

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
  const headers: TecobraryHeaders = {}
  if (token) {
    headers["Authorization"] = `token ${token}`
  }
  if (deviceId) {
    headers["X-TECOBRARY-DEVICE-ID"] = deviceId
  }

  return await Api.server()
    .post("/api/reviews/select-book", {
      ...selectBook
    }, {
      headers: headers
    })
}

interface TecobraryHeaders {
  [key: string]: string
}

export const ReviewApi = {
  searchBooks,
  selectBook
}