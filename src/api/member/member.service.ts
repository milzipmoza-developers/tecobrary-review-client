import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {MemberAuth} from "./member.model";

const getLoginUrl = async (uuid: string): Promise<string> => {
  const response = await requestGetLoginUrl(uuid)
  return response.data.data
}

const requestGetLoginUrl = async (uuid: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/logins", {
      headers: {
        "X-TECOBRARY-DEVICE-ID": uuid
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

const getAuthenticationToken = async (deviceId: string, code: string): Promise<MemberAuth> => {
  const response = await requestAuthenticationToken(deviceId, code)
  return {
    issuedDate: response.data.data.issuedDate,
    token: response.data.data.token
  }
}

const requestAuthenticationToken = async (deviceId: string, code: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/authenticates", {
      headers: {
        "X-TECOBRARY-DEVICE-ID": deviceId
      },
      params: {
        code: code
      }
    })
}

export const MemberApi = {
  getLoginUrl,
  getDeviceId,
  getAuthenticationToken
}