export interface TagInput {
  colorCode: string
  name: string
  description: string
}

export interface CreateTag {
  colorCode: string
  name: string
  description: string
}

export interface SearchTag {
  bookNo?: string
  tagName?: string
}

export interface Tag {
  no: string
  colorCode: string
  name: string
  description: string
}