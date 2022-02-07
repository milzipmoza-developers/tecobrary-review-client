import {DisplayBookTag} from "./display.model";


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