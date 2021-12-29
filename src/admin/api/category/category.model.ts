export interface Category {
  no: string,
  name: string,
  description: string
  imageUrl: string
}

export interface CreateCategory {
  name: string,
  description: string,
  imageUrl: string
}

export interface CategoryInput {
  name: string
  description: string
  imageUrl: string
}