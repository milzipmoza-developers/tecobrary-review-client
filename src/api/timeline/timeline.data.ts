import {Tag} from "../../interfaces";


export interface TimelineData {
  member: TimelineMember
  book: TimelineBook
  review: TimelineReview
}

interface TimelineMember {
  no: string
  name: string
  profileImageUrl: string
}

interface TimelineBook {
  isbn: string
  title: string
  imageUrl: string
  tags: Tag[]
}

interface TimelineReview {
  range: string
  content: string
  informative: string
  readMore?: string
  selectables: string[]
}