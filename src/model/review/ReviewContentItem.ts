import {IndexValue, KeywordProps} from "./index";

export class ReviewContentItem {
  enumName: string
  displayName: string
  index: number
  count: number

  constructor(enumName: string, count: number) {
    this.enumName = enumName
    this.displayName = ReviewContent[enumName].displayName
    this.index = ReviewContent[enumName].index
    this.count = count
  }
}

const ReviewContent: KeywordProps<IndexValue> = {
  VERY_EASY: {index: 0, displayName: "💧 매우 쉬워요"},
  EASY: {index: 1, displayName: "쉬워요"},
  SO_SO: {index: 2, displayName: "보통이예요"},
  HARD: {index: 3, displayName: "어려워요"},
  VERY_HARD: {index: 4, displayName: "🔥 매우 어려워요"},
}