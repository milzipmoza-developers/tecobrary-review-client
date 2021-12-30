import {ApiCreateRequest, PageData, PageRequest} from "../interfaces";
import {AxiosResponse} from "axios";
import * as Api from "../axios.config";
import {Book, CreateBook, SearchBook, SearchBookQuery} from "./book.model";

const create = async (createDto: CreateBook): Promise<boolean> => {
  const response = await requestCreateBook({create: createDto})
  return response.data.data
}

const requestCreateBook = async (requestBody: ApiCreateRequest<CreateBook>): Promise<AxiosResponse> => {
  return await Api.server()
    .post("/api/books", requestBody)
}

const getAll = async (pageRequest: PageRequest): Promise<PageData<Book>> => {
  const response = await requestBooks(pageRequest)
  return {
    total: response.data.data.total,
    size: response.data.data.size,
    isFirst: response.data.data.isFirst,
    isLast: response.data.data.isLast,
    items: response.data.data.items
  }
}

const requestBooks = async (pageRequest: PageRequest): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/books", {
      params: {
        ...pageRequest
      }
    })
}

const get = async (isbn: string): Promise<Book> => {
  const response = await requestBook(isbn)
  return {
    isbn: response.data.data.isbn,
    detail: response.data.data.detail,
    category: response.data.data.category
  }
}

const requestBook = async (isbn: string): Promise<AxiosResponse> => {
  return await Api.server()
    .get(`/api/books/${isbn}`)
}

const search = async (keyword: string): Promise<PageData<SearchBook>> => {
  const response = await requestSearch(
    {
      page: 1,
      size: 15
    },
    {
      keyword
    }
  )
  return response.data.data
}

const requestSearch = async (pageRequest: PageRequest, search: SearchBookQuery): Promise<AxiosResponse> => {
  return await Api.server()
    .get("/api/search-books", {
      params: {
        ...pageRequest,
        ...search
      }
    })
}

export const BookApi = {
  create,
  search,
  getAll,
  get
}