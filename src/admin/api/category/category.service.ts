import {ApiCreateRequest, PageData, PageRequest} from "../interfaces";
import * as Api from "../axios.config"
import {AxiosResponse} from "axios";
import {Category, CreateCategory} from "./category.model";

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

const create = async (createDto: CreateCategory): Promise<string> => {
  const response = await requestCreateCategory({create: createDto});
  return response.data
}

const requestGetCategories = async (pageRequest: PageRequest): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/categories", {
      params: {...pageRequest}
    });
}

const requestCreateCategory = async (requestBody: ApiCreateRequest<CreateCategory>): Promise<AxiosResponse> => {
  return await Api.server()
    .post("/api/categories", requestBody);
}

export const CategoryApi = {
  get,
  create
}