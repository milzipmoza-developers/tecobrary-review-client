import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {PageData, PageRequest} from "../model";
import {Category} from "./category.model";

const get = async (pageRequest: PageRequest): Promise<PageData<Category>> => {
  const response = await requestGetCategories(pageRequest)
  return {
    total: response.data.data.total,
    size: response.data.data.size,
    isFirst: response.data.data.isFirst,
    isLast: response.data.data.isLast,
    items: response.data.data.items
  }
}

const requestGetCategories = async (pageRequest: PageRequest): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/categories", {
      params: {
        ...pageRequest
      }
    })
}

export const CategoryApi = {
  get
}