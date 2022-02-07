import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {DisplayBook} from "./display.book.model";
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

export const DisplayBookApi = {
  getBook
}