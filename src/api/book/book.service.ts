import {PageRequest} from "../model";
import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {CategoryBookPage} from "./book.model";

const get = async (categoryNo: string, pageRequest: PageRequest): Promise<CategoryBookPage> => {
  const response = await requestGetBooks(categoryNo, pageRequest)
  const {category, pageData} = response.data.data
  return {
    category: {
      ...category
    },
    pageData: {
      ...pageData
    }
  }
}

const requestGetBooks = async (categoryNo: string, pageRequest: PageRequest): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/books/by-categories", {
      params: {
        ...pageRequest,
        categoryNo
      }
    })
}

export const BookApi = {
  get
}