import {atom} from "recoil";

interface AdminBookPageStatus {
  page: number
  size: number
}

const defaultStatus = (): AdminBookPageStatus => ({
  page: 0,
  size: 10
})

export const adminBookPageStatus = atom({
  key: "adminBookPageStatus",
  default: defaultStatus()
})