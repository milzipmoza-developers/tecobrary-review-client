import {DisplayValue, KeywordProps} from "./index";

export class ReviewRange {
  enumName: string
  displayName: string
  displayOrder: number
  count: number

  constructor(enumName: string, count: number) {
    this.enumName = enumName;
    this.displayName = ReadRange[enumName].displayName;
    this.displayOrder = ReadRange[enumName].displayOrder;
    this.count = count;
  }
}

const ReadRange: KeywordProps<DisplayValue> = {
  READ_INTRODUCTION: {displayOrder: 1, displayName: "필요한 책인지 훑어봤어요"},
  A_LITTLE: {displayOrder: 2, displayName: "필요한 부분만 읽어봤어요"},
  ONE_CHAPTER: {displayOrder: 3, displayName: "한 챕터 읽었어요"},
  MULTIPLE_CHAPTERS: {displayOrder: 4, displayName: "여러 챕터 읽었어요"},
  READ_ALL: {displayOrder: 5, displayName: "전부 읽었어요"},
}
