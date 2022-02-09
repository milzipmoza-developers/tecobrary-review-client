interface KeywordProps<T> {
  [key: string]: T
}

interface IndexValue {
  index: number
  displayName: string
}

interface DisplayValue {
  displayOrder: number
  displayName: string
}

export type {
  KeywordProps,
  IndexValue,
  DisplayValue
}