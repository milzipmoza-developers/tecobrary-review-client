import {ApiCreateRequest, PageData, PageRequest} from "../interfaces";
import {AxiosResponse} from "axios";
import * as Api from "../axios.config"
import {CreateTag, SearchTag, Tag} from "./tag.model";

const create = async (createDto: CreateTag): Promise<boolean> => {
  const response = await requestCreateTag({create: createDto})
  return response.data.data
}

const requestCreateTag = async (requestBody: ApiCreateRequest<CreateTag>): Promise<AxiosResponse> => {
  return await Api.server()
    .post("/api/tags", requestBody)
}

const get = async (pageRequest: PageRequest, search: SearchTag): Promise<PageData<Tag>> => {
  const response = await requestGetTags(pageRequest, search)
  return {
    total: response.data.data.total,
    size: response.data.data.size,
    isFirst: response.data.data.isFirst,
    isLast: response.data.data.isLast,
    items: response.data.data.items
  }
}

const requestGetTags = async (pageRequest: PageRequest, search: SearchTag): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/tags", {
      params: {
        ...pageRequest,
        ...search
      }
    })
}

export const TagApi = {
  get,
  create,
}