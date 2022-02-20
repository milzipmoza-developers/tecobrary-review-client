import {IndexValue, KeywordProps} from "./index";

export class ReviewReadMoreItem {
  enumName: string
  displayName: string
  index: number
  count: number

  constructor(enumName: string, count: number) {
    this.enumName = enumName
    this.displayName = ReviewReadMore[enumName].displayName
    this.index = ReviewReadMore[enumName].index
    this.count = count
  }
}

const ReviewReadMore: KeywordProps<IndexValue> = {
  NO_MORE: {index: 0, displayName: "안 읽을래요"},
  NEEDED: {index: 1, displayName: "필요한 부분만 읽을래요"},
  ALL: {index: 2, displayName: "다 읽을래요"},
}