import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {headers} from "../../admin/api/header";
import {Bookmark} from "../member/member.model";

const getRecents = async (size: number, lastItemMarkDateTime: string | null): Promise<Bookmark[]> => {
  const response = await requestMark(size, lastItemMarkDateTime)
  return response.data.data
}

const requestMark = async (size: number, lastItemMarkDateTime: string | null): Promise<AxiosResponse> => {
  return await Api.server()
    .get(`/api/bookmarks`, {
      headers: headers(),
      params: {
        size,
        lastItemMarkDateTime
      }
    })
}

export const BookmarkApi = {
  getRecents
}