import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {DisplayMain} from "./display.model";

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

export const DisplayApi = {
  get
}