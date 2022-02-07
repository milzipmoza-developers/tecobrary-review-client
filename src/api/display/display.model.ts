export interface DisplayMainNewBookSection {
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

export interface DisplayBookTag {
  name: string,
  colorCode: string
}

export interface DisplayMainInterestBookSection {
  type: string,
  books: DisplayInterestBook[]
}

export interface DisplayInterestBook {
  isbn: string
  title: string
  author: string
  imageUrl: string
  tags: DisplayBookTag[],
  counts: number
}