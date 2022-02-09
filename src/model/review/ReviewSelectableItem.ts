import {IndexValue, KeywordProps} from "./index";

export class ReviewSelectableItem {
  enumName: string
  displayName: string
  index: number
  count: number

  constructor(enumName: string, count: number) {
    this.enumName = enumName
    this.displayName = ReviewSelectables[enumName].displayName
    this.index = ReviewSelectables[enumName].index
    this.count = count
  }
}

const ReviewSelectables: KeywordProps<IndexValue> = {
  FUNDAMENTAL: {index: 0, displayName: "✏️ 개념 위주예요"},
  TECHNOLOGY: {index: 1, displayName: "🔬 특정 기술 위주예요"},
  GOOD_CODE: {index: 2, displayName: "💻 예제 코드가 꼼꼼해요"},
  GOOD_EXPLANATION: {index: 3, displayName: "📄 설명이 잘 되어있어요"},
  GOOD_TRANSLATION: {index: 4, displayName: "👍 번역이 잘 되어있어요"},
  BAD_TYPO: {index: 5, displayName: "🛠 오탈자가 많아요"},
}