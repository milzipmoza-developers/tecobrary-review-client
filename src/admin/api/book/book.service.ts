import {ApiCreateRequest, ApiUpdateRequest, PageData, PageRequest} from "../interfaces";
import {AxiosResponse} from "axios";
import * as Api from "../axios.config";
import {Book, BookCategory, BookTag, CreateBook, SearchBook, SearchBookQuery} from "./book.model";

const create = async (createDto: CreateBook): Promise<boolean> => {
  const response = await requestCreateBook({create: createDto})
  return response.data.data
}

const requestCreateBook = async (requestBody: ApiCreateRequest<CreateBook>): Promise<AxiosResponse> => {
  return await Api.server()
    .post("/api/books", requestBody)
}

const addCategory = async (isbn: string, categoryDto: BookCategory): Promise<boolean> => {
  const response = await requestBookAddCategory(isbn, {update: categoryDto})
  return response.data.data
}

const requestBookAddCategory = async (isbn: string, requestBody: ApiUpdateRequest<BookCategory>): Promise<AxiosResponse> => {
  return await Api.server()
    .post(`/api/books/${isbn}/add-category`, requestBody)
}

const clearCategory = async (isbn: string): Promise<boolean> => {
  const response = await requestBookClearCategory(isbn)
  return response.data.data
}

const requestBookClearCategory = async (isbn: string): Promise<AxiosResponse> => {
  return await Api.server()
    .post(`/api/books/${isbn}/clear-category`)
}

const addTags = async (isbn: string, tagDtos: BookTag[]): Promise<boolean> => {
  const response = await requestBookAddTags(isbn, {update: tagDtos})
  return response.data.data
}

const requestBookAddTags = async (isbn: string, requestBody: ApiUpdateRequest<BookTag[]>): Promise<AxiosResponse> => {
  return await Api.server()
    .post(`/api/books/${isbn}/add-tag`, requestBody)
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
    category: response.data.data.category,
    tags: response.data.data.tags
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
  addCategory,
  addTags,
  search,
  getAll,
  get,
  clearCategory
}