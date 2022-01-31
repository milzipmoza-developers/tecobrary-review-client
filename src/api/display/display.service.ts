import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {DisplayBook, DisplayMain} from "./display.model";

const get = async (): Promise<DisplayMain> => {
  const response = await requestMainDisplay()
  const {version, news, interests, categories} = response.data.data
  return {
    version: version,
    news: {
      updateDate: news.updateDate,
      books: news.books
    },
    interests: [],
    categories: categories
  }
}

const requestMainDisplay = async (): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/main")
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

export const DisplayApi = {
  get,
  getBook
}