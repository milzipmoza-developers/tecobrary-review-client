import {AxiosResponse} from "axios";
import * as Api from "../../admin/api/axios.config";
import {TimelineData} from "./timeline.data";

const getTimeline = async (size: number, lastAttribute?: string): Promise<TimelineData[]> => {
  const response = await requestTimeline(size, lastAttribute);
  return response.data.data;
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

const hasMore = async (latestReviewNo: string): Promise<boolean> => {
  const response = await requestHasMore(latestReviewNo);
  return response.data.data;
}

const requestHasMore = async (latestReviewNo: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/timeline/has-more", {
      params: {latestReviewNo}
    });
}

export const TimelineApi = {
  getTimeline,
  hasMore
}