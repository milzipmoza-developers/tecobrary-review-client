import {TimelineData} from "../../api/timeline/timeline.data";
import {Timeline} from "./index";
import {ReviewRange} from "../review/ReviewRange";
import {ReviewContentItem} from "../review/ReviewContentItem";
import {ReviewInformativeItem} from "../review/ReviewInformativeItem";
import {ReviewReadMoreItem} from "../review/ReviewReadMoreItem";
import {ReviewSelectableItem} from "../review/ReviewSelectableItem";

export function timelineMapper(data: TimelineData): Timeline {
  return {
    ...data,
    review: {
      no: data.review.no,
      range: new ReviewRange(data.review.range, 0),
      content: new ReviewContentItem(data.review.content, 0),
      informative: new ReviewInformativeItem(data.review.informative, 0),
      readMore: data.review.readMore
        ? new ReviewReadMoreItem(data.review.readMore, 0)
        : undefined,
      selectables: data.review.selectables.map(it => new ReviewSelectableItem(it, 0))
    }
  }
}