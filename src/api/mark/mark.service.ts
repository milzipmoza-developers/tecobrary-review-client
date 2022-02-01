import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";

export type MarkType = "like" | "favorite"

const mark = async (deviceId: string, token: string, isbn: string, type: MarkType): Promise<boolean> => {
  const response = await requestMark(deviceId, token, isbn, type)
  return response.data.data
}

const requestMark = async (deviceId: string, token: string, isbn: string, type: MarkType): Promise<AxiosResponse> => {
  if (deviceId.length == 0 || token.length == 0) {
    return await Api.server()
      .post(`/api/marks/${type}/mark`, {
        isbn: isbn
      })
  }
  return await Api.server()
    .post(`/api/marks/${type}/mark`, {
      isbn: isbn
    }, {
      headers: {
        "Authorization": `token ${token}`,
        "X-TECOBRARY-DEVICE-ID": deviceId
      }
    })
}
const unmark = async (deviceId: string, token: string, isbn: string, type: MarkType): Promise<boolean> => {
  const response = await requestUnmark(deviceId, token, isbn, type)
  return response.data.data
}

const requestUnmark = async (deviceId: string, token: string, isbn: string, type: MarkType): Promise<AxiosResponse> => {
  if (deviceId.length == 0 && token.length == 0) {
    return await Api.server()
      .post(`/api/marks/${type}/unmark`, {
        isbn: isbn
      })
  }
  return await Api.server()
    .post(`/api/marks/${type}/unmark`, {
      isbn: isbn
    }, {
      headers: {
        "Authorization": `token ${token}`,
        "X-TECOBRARY-DEVICE-ID": deviceId
      }
    })
}

export const MarkApi = {
  mark,
  unmark
}