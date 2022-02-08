import {DisplayBookReviewSummary, DisplayBookReviewSummaryRange} from "../../api/display/display.book.model";

export class ReviewRanges {
  readAll: DisplayBookReviewSummaryRange
  multipleChapters: DisplayBookReviewSummaryRange
  oneChapter: DisplayBookReviewSummaryRange
  aLittle: DisplayBookReviewSummaryRange
  introduction: DisplayBookReviewSummaryRange

  constructor(summary: DisplayBookReviewSummary) {
    this.readAll = summary.ranges.find(it => it.range == "READ_ALL") ?? {
      range: "READ_ALL",
      displayName: "전부 읽었어요",
      count: 0
    }

    this.multipleChapters = summary.ranges.find(it => it.range == "MULTIPLE_CHAPTERS") ?? {
      range: "MULTIPLE_CHAPTERS",
      displayName: "여러 챕터 읽었어요",
      count: 0
    }

    this.oneChapter = summary.ranges.find(it => it.range == "ONE_CHAPTER") ?? {
      range: "ONE_CHAPTER",
      displayName: "한 챕터 읽었어요",
      count: 0
    }

    this.aLittle = summary.ranges.find(it => it.range == "A_LITTLE") ?? {
      range: "A_LITTLE",
      displayName: "필요한 부분만 읽어봤어요",
      count: 0
    }

    this.introduction = summary.ranges.find(it => it.range == "READ_INTRODUCTION") ?? {
      range: "READ_INTRODUCTION",
      displayName: "필요한 책인지 훑어봤어요",
      count: 0
    }
  }
}