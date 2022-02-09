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
  NEVER: {index: 0, displayName: "🙅 전혀 안되었어요"},
  NO: {index: 1, displayName: "🤦 안되었어요"},
  YES: {index: 2, displayName: "🤷 되었어요"},
}