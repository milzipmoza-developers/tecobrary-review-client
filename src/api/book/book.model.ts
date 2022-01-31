import {PageData} from "../model";

export interface Book {
  isbn: string
  detail: BookDetail,
  category?: BookCategory,
  tags: BookTag[]
}

interface BookDetail {
  imageUrl: string
  title: string
  publisher: string
  author: string
  locale: string
  publishDate: string
  description: string
}

interface BookCategory {
  no: string
  name: string
  imageUrl: string
}

interface BookTag {
  no: string
  name: string
  colorCode: string
}

export interface CategoryBookPage {
  category: BookCategory
  pageData: PageData<Book>
}
