import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";

const getLoginUrl = async (uuid: string): Promise<string> => {
  const response = await requestGetLoginUrl(uuid)
  return response.data.data
}

const requestGetLoginUrl = async (uuid: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/logins", {
      headers: {
        "X-USER-DEVICE-ID": uuid
      }
    })
}

const getDeviceId = async (): Promise<string> => {
  const response = await requestDeviceId()
  return response.data.data
}

const requestDeviceId = async (): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/device-ids")
}

export const MemberApi = {
  getLoginUrl,
  getDeviceId
}