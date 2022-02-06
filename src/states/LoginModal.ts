import {atom} from "recoil";

interface LoginModal {
  open: boolean
  message?: string
}

const defaultState = (): LoginModal => ({
  open: false
})

export const loginModalState = atom({
  key: "loginModalState",
  default: defaultState()
})