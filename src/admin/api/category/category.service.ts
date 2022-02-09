import {ApiCreateRequest, KeywordRequest, PageData, PageRequest} from "../interfaces";
import * as Api from "../axios.config"
import {AxiosResponse} from "axios";
import {Category, CreateCategory} from "./category.model";
import {headers} from "../header";

const get = async (pageRequest: PageRequest, keywordRequest?: KeywordRequest): Promise<PageData<Category>> => {
  const response = await requestGetCategories(pageRequest, keywordRequest)
  return {
    total: response.data.data.total,
    size: response.data.data.size,
    isFirst: response.data.data.isFirst,
    isLast: response.data.data.isLast,
    items: response.data.data.items
  }
}

const create = async (createDto: CreateCategory): Promise<string> => {
  const response = await requestCreateCategory({create: createDto});
  return response.data
}

const requestGetCategories = async (pageRequest: PageRequest, keywordRequest?: KeywordRequest): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/categories", {
      params: {
        ...pageRequest,
        ...keywordRequest
      }
    });
}

const requestCreateCategory = async (requestBody: ApiCreateRequest<CreateCategory>): Promise<AxiosResponse> => {
  return await Api.server()
    .post("/api/categories", requestBody, {
      headers: headers()
    });
}

export const CategoryApi = {
  get,
  create
}