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
  VERY_EASY: {index: 0, displayName: "๐ง ๋งค์ฐ ์ฌ์์"},
  EASY: {index: 1, displayName: "์ฌ์์"},
  SO_SO: {index: 2, displayName: "๋ณดํต์ด์์"},
  HARD: {index: 3, displayName: "์ด๋ ค์์"},
  VERY_HARD: {index: 4, displayName: "๐ฅ ๋งค์ฐ ์ด๋ ค์์"},
}