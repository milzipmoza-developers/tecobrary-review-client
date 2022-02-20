import {Tag} from "../../interfaces";
import {ReviewRange} from "../review/ReviewRange";
import {ReviewContentItem} from "../review/ReviewContentItem";
import {ReviewInformativeItem} from "../review/ReviewInformativeItem";
import {ReviewReadMoreItem} from "../review/ReviewReadMoreItem";
import {ReviewSelectableItem} from "../review/ReviewSelectableItem";


export interface Timeline {
  member: TimelineMember
  book: TimelineBook
  review: TimelineReview
}

export interface TimelineMember {
  no: string
  name: string
  profileImageUrl: string
}

export interface TimelineBook {
  isbn: string
  title: string
  imageUrl: string
  tags: Tag[]
}

export interface TimelineReview {
  no: string
  range: ReviewRange
  content: ReviewContentItem
  informative: ReviewInformativeItem
  readMore?: ReviewReadMoreItem
  selectables: ReviewSelectableItem[]
}