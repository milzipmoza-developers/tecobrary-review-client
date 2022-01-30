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