export interface SearchBookQuery {
  keyword: string
}

export interface SearchBook {
  isbn: string
  title: string
  publisher: string
  author: string
  imageUrl: string
  description: string
  publishDate: string
}

export interface CreateBook {
  isbn: string
  imageUrl: string
  title: string
  publisher: string
  author: string
  publishDate: string
  description: string
}

export interface Book {
  isbn: string,
  detail: BookDetail,
}

interface BookDetail {
  imageUrl: string,
  title: string,
  publisher: string,
  author: string,
  locale: string,
  publishDate: string,
  description: string
}