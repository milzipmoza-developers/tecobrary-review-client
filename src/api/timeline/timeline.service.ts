import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {TimelineData} from "./timeline.data";

const getTimeline = async (size: number, lastAttribute?: string): Promise<TimelineData[]> => {
  const response = await requestTimeline(size, lastAttribute)
  return response.data.data
}

const requestTimeline = async (size: number, lastAttribute?: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/timeline", {
      params: {
        size,
        lastAttribute
      }
    });
}

export const TimelineApi = {
  getTimeline
}