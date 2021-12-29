export interface ApiCreateRequest<T> {
  create: T
}

export interface UpdateRequest<T> {
  update: T
}

export interface PageRequest {
  page: number,
  size: number
}

export interface PageData<T> {
  total: number,
  size: number,
  isFirst: boolean,
  isLast: boolean,
  items: T[]
}

export interface ApiResponse<T> {
  status: string,
  message: string,
  responseDateTime: string,
  data: T
}
