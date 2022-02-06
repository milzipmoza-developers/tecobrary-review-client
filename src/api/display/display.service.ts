import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {
  DisplayBook,
  DisplayMainCategory,
  DisplayMainInterestBookSection,
  DisplayMainNewBookSection
} from "./display.model";

const getNewBooks = async (): Promise<DisplayMainNewBookSection> => {
  const response = await requestMainNewBooks()
  const {updateDate, books} = response.data.data
  return {
    updateDate,
    books
  }
}

const requestMainNewBooks = async (): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/display/main/new-books")
}

const getRandomCategories = async (): Promise<DisplayMainCategory[]> => {
  const response = await requestRandomCategories()
  return response.data.data
}

const requestRandomCategories = async (): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/display/main/categories")
}

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

const requestDisplayBook = async (isbn: string, deviceId: string, token: string): Promise<AxiosResponse> => {
  if (deviceId.length != 0 && token.length != 0) {
    return await Api.server()
      .get(`/api/displays/books/${isbn}`, {
        headers: {
          "Authorization": `token ${token}`,
          "X-TECOBRARY-DEVICE-ID": deviceId
        }
      })
  }
  return await Api.server()
    .get(`/api/displays/books/${isbn}`)
}

const getMostLikeBooks = async (): Promise<DisplayMainInterestBookSection> => {
  const response = await requestDisplayInterestBook("MANY_LIKES")
  const {type, books} = response.data.data
  return {
    type,
    books
  }
}

const getMostFavoriteBooks = async (): Promise<DisplayMainInterestBookSection> => {
  const response = await requestDisplayInterestBook("MANY_FAVORITES")
  const {type, books} = response.data.data
  return {
    type,
    books
  }
}

const getMostReviewedBooks = async (): Promise<DisplayMainInterestBookSection> => {
  const response = await requestDisplayInterestBook("MANY_REVIEWS")
  const {type, books} = response.data.data
  return {
    type,
    books
  }
}

const requestDisplayInterestBook = async (type: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/display/main/interest-books", {
      params: {
        type
      }
    })
}

export const DisplayApi = {
  getNewBooks,
  getRandomCategories,
  getMostLikeBooks,
  getMostFavoriteBooks,
  getMostReviewedBooks,
  getBook
}