export interface DisplayMain {
  version: string
  news: DisplayMainNewBookSection
  interests: []
  categories: DisplayMainCategory[]
}

interface DisplayMainNewBookSection {
  updateDate: string
  books: DisplayMainNewBook[]
}

export interface DisplayMainNewBook {
  isbn: string
  imageUrl: string
  author: string
  title: string
}

export interface DisplayMainCategory {
  no: string
  name: string
  imageUrl: string
}

export interface DisplayBook {
  book: DisplayBookDetail
  mark: DisplayBookMark
  category?: DisplayBookCategory
  tags: DisplayBookTag[]
}

export interface DisplayBookDetail {
  isbn: string
  imageUrl: string
  title: string
  publisher: string
  author: string
  publishDate: string
  description: string
}

export interface DisplayBookMark {
  like: DisplayBookLikeMark
  favorite: DisplayBookFavoriteMark
}

interface DisplayBookLikeMark {
  liked: boolean
  counts: number
}

interface DisplayBookFavoriteMark {
  marked: boolean
  counts: number
}

interface DisplayBookCategory {
  no: string
  imageUrl: string
}

export interface DisplayBookTag {
  name: string,
  colorCode: string
}