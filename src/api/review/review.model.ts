export interface ReviewSearchBook {
  isbn: string
  title: string
  publisher: string
  author: string
  imageUrl: string
  description: string
  publishDate: string
  tags: ReviewSearchBookTag[]
}

interface ReviewSearchBookTag {
  name: string
  colorCode: string
}

export interface ReviewSelectableRanges {
  ranges: ReviewRange[]
}

interface ReviewRange {
  displayOrder: number
  displayName: string
  key: string
  disabled: boolean
}

export interface ReviewSubmit {
  isbn: string
  range: string
  content: string
  informative: string
  readMore?: string
  selectables: string[]
}

export interface ReviewKeyword {
  index: number
  name: string
}

export interface SelectedReviewRange {
  key: string
  displayName: string
}

export const ReviewKeywordConverter = {
  convertContent: (index: number): string => {
    return ReviewKeywordMap.content[index]
  },
  convertInformative: (index: number): string => {
    return ReviewKeywordMap.informative[index]
  },
  convertReadMore: (index: number): string => {
    return ReviewKeywordMap.readMore[index]
  },
  convertSelectables: (index: number): string => {
    return ReviewKeywordMap.selectable[index]
  }
}

interface ReviewKeywordProp {
  [key: number]: string
}

interface ReviewKeywordMapElement {
  [type: string]: ReviewKeywordProp
}

export const ReviewKeywordMap: ReviewKeywordMapElement = {
  content: {
    0: "VERY_EASY",
    1: "EASY",
    2: "SO_SO",
    3: "HARD",
    4: "VERY_HARD"
  },
  informative: {
    0: "NEVER",
    1: "NO",
    2: "YES",
    3: "MUCH"
  },
  readMore: {
    0: "NO_MORE",
    1: "NEEDED",
    2: "ALL"
  },
  selectable: {
    0: "FUNDAMENTAL",
    1: "TECHNOLOGY",
    2: "GOOD_CODE",
    3: "GOOD_EXPLANATION",
    4: "GOOD_TRANSLATION",
    5: "BAD_TYPO"
  }
}