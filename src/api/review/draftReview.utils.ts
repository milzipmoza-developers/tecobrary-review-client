import {ReviewKeyword, ReviewSearchBook, SelectedReviewRange} from "./review.model";

export class DraftReview {

  static keys = {
    DRAFT_REVIEW_BOOK: "selected_review_book",
    DRAFT_REVIEW_RANGE: "selected_review_range",
    DRAFT_REVIEW_KEYWORD_SELECTABLES: "selected_review_selectables",
    DRAFT_REVIEW_KEYWORD_READ_MORE: "selected_review_read_more",
    DRAFT_REVIEW_KEYWORD_CONTENT: "selected_review_content",
    DRAFT_REVIEW_KEYWORD_INFORMATIVE: "selected_review_informative",
  }

  static setBook(book: ReviewSearchBook): void {
    localStorage.setItem(DraftReview.keys.DRAFT_REVIEW_BOOK, JSON.stringify(book))
  }

  static removeBook(): void {
    localStorage.removeItem(DraftReview.keys.DRAFT_REVIEW_BOOK)
  }

  static setRange(range: SelectedReviewRange): void {
    localStorage.setItem(DraftReview.keys.DRAFT_REVIEW_RANGE, JSON.stringify(range))
  }

  static removeRange(): void {
    localStorage.removeItem(DraftReview.keys.DRAFT_REVIEW_RANGE)
  }

  static setKeywordContent(keyword: ReviewKeyword): void {
    localStorage.setItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_CONTENT, JSON.stringify(keyword))
  }

  static setKeywordInformative(keyword: ReviewKeyword): void {
    localStorage.setItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_INFORMATIVE, JSON.stringify(keyword))
  }

  static setKeywordReadMore(keyword: ReviewKeyword): void {
    localStorage.setItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_READ_MORE, JSON.stringify(keyword))
  }

  static setKeywordSelectables(selectables: ReviewKeyword[]): void {
    localStorage.setItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_SELECTABLES, JSON.stringify(selectables))
  }

  static removeKeywords(): void {
    localStorage.removeItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_CONTENT)
    localStorage.removeItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_INFORMATIVE)
    localStorage.removeItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_READ_MORE)
    localStorage.removeItem(DraftReview.keys.DRAFT_REVIEW_KEYWORD_SELECTABLES)
  }

  static clear(): void {
    this.removeBook()
    this.removeRange()
    this.removeKeywords()
  }
}