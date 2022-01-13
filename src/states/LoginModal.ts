import {atom} from "recoil";

interface LoginModal {
  open: boolean
}

const defaultState = (): LoginModal => ({
  open: false
})

export const loginModalState = atom({
  key: "loginModalState",
  default: defaultState()
})