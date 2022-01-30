import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {MemberMyInfo} from "./member.model";

const getMyInfo = async (token: string, deviceId: string): Promise<MemberMyInfo> => {
  const response = await requestGetMyInfo(token, deviceId)
  const {member} = response.data.data
  return {
    member: {
      name: member.name,
      email: member.email,
      profileImageUrl: member.profileImageUrl,
      blogUrl: member.blogUrl,
      description: member.description
    }
  }
}

const requestGetMyInfo = async (token: string, deviceId: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/members/my-info", {
      headers: {
        "Authorization": `token ${token}`,
        "X-TECOBRARY-DEVICE-ID": deviceId
      }
    })
}

export const MemberApi = {
  getMyInfo
}