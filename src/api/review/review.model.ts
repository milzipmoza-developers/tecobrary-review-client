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