export interface Tag {
  name: string
  colorCode: string
}

export interface Category {
  no: string
  name: string
  imageUrl: string
}

export interface NewBook {
  isbn: string
  imageUrl: string
  title: string
  author: string
}

export interface InterestedBooks {
  type: 'REVIEW' | 'LIKE' | 'BOOK_MARKED'
  books: InterestedBook[]
}

export interface InternalSearchBook extends Book {
  isbn: string
  imageUrl: string
  title: string
  author: string
  tags: Tag[]
}

export interface NaverSearchBook {
  imageUrl: string
  title: string
  author: string
  isbn: string
}

export interface Book {
  isbn: string
  imageUrl: string
  title: string
  author: string
  tags?: Tag[]
}

export interface InterestedBook extends Book {
  isbn: string
  imageUrl: string
  title: string
  author: string
  tags: Tag[]
  counts: number
}

export interface ListBook extends Book {
  isbn: string
  imageUrl: string
  title: string
  author: string
  tags: Tag[]
  countDetail: BookInterestCount
}

export interface BookInterestCount {
  like: number
  review: number
  bookMarked: number
}

export interface BookMarks {
  like: BookLike,
  favorite: BookFavorite
}

export interface BookLike {
  liked: boolean,
  counts: number
}

export interface BookFavorite {
  marked: boolean,
  counts: number
}

export interface BookTechDetail {
  mainTech: string
  additionalTech: string[]
  mainVersion: string
  versionDependency: string
}

export interface BookDetail {
  isbn: string
  imageUrl: string
  title: string
  author: string
  publisher: string
  description: string
  publishDate: string
  categories: Tag[]
  like: BookLike
  bookMark: BookFavorite
  techDetail?: BookTechDetail
}

export interface BookReview {
  id: number
  member: BookReviewMember
  reviewType: 'SHORT_REVIEW' | 'BLOG_IMPORT'
  content: string
  rate: number
  blogContentUrl?: string
}

export interface BookDetailReview {
  counts: number
  reviews: BookReview[]
}

export interface BookReviewMember {
  name: string
  profileUrl: string
}