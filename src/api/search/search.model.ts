export interface SearchBook {
  isbn: string
  title: string
  publisher: string
  author: string
  imageUrl: string
  description: string
  publishDate: string
  tags: SearchBookTag[]
}

interface SearchBookTag {
  name: string
  colorCode: string
}