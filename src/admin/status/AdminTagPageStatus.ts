import {atom} from "recoil";
import {PageStatus} from "./index";

const defaultStatus = (): PageStatus => ({
  page: 0,
  size: 10
})

export const adminTagPageStatus = atom({
  key: "adminTagPageStatus",
  default: defaultStatus()
})