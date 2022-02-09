import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {DisplayBook, DisplayBookReviewKeyword, DisplayBookReviewSummary} from "./display.book.model";
import {createHeaders} from "../header";


const getBook = async (isbn: string, deviceId: string, token: string): Promise<DisplayBook> => {
  const response = await requestDisplayBook(isbn, deviceId, token)
  const {book, mark, category, tags,} = response.data.data

  return {
    book,
    mark,
    category,
    tags,
  }
}

const requestDisplayBook = async (isbn: string, deviceId?: string, token?: string): Promise<AxiosResponse> => {
  const headers = createHeaders(token, deviceId)

  return await Api.server()
    .get(`/api/displays/books/${isbn}`, {
      headers
    })
}

const getReviewSummary = async (isbn: string): Promise<DisplayBookReviewSummary> => {
  const response = await requestDisplayBookReviewSummary(isbn)
  const {total, ranges} = response.data.data

  return {
    total,
    ranges
  }
}

const requestDisplayBookReviewSummary = async (isbn: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get(`/api/displays/books/${isbn}/review-ranges`)
}

const getReviewKeywords = async (isbn: string): Promise<DisplayBookReviewKeyword> => {
  const response = await requestDisplayBookReviewKeywords(isbn)

  const {content, informative, readMore, selectables} = response.data.data
  return {
    content,
    informative,
    readMore,
    selectables
  }
}

const requestDisplayBookReviewKeywords = async (isbn: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get(`/api/displays/books/${isbn}/reviews`)
}

export const DisplayBookApi = {
  getBook,
  getReviewSummary,
  getReviewKeywords
}