import {PageData} from "../model";
import {AxiosResponse} from "axios";
import {createHeaders} from "../header";
import * as Api from "../../admin/api/axios.config";
import {SearchBook} from "./search.model";

const searchBooks = async (keyword: string, token?: string, deviceId?: string): Promise<PageData<SearchBook>> => {
  const response = await requestSearchBooks(keyword, token, deviceId)
  const {total, size, isFirst, isLast, items} = response.data.data
  return {total, size, isFirst, isLast, items}
}

const requestSearchBooks = async (keyword: string, token?: string, deviceId?: string): Promise<AxiosResponse> => {
  const headers = createHeaders(token, deviceId)

  return await Api.server()
    .get("/api/search-books/limited", {
      headers: headers,
      params: {
        keyword
      }
    })
}

export const SearchApi = {
  searchBooks
}