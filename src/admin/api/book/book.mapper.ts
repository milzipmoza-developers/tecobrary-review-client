import {Book, SearchBook} from "./book.model";
import {OptionBook} from "../../pages/book/AdminBookPage";
import {ListElementProps} from "../../components/ListProps";

const map = (searchBook: SearchBook): OptionBook => {
  return {
    isbn: searchBook.isbn,
    title: searchBook.title,
    publisher: searchBook.publisher,
    author: searchBook.author,
    imageUrl: searchBook.imageUrl,
    description: searchBook.description,
    publishDate: searchBook.publishDate,
  }
}

const mapToElementProps = (items: Book[]): ListElementProps => {
  return {
    data: items.map(item => ({
      isbn: item.isbn,
      title: item.detail.title,
      publisher: item.detail.publisher,
      author: item.detail.author,
      publishDate: item.detail.publishDate
    }))
  }
}

export const BookMapper = {
  map,
  mapToElementProps
}