import {atom} from "recoil";

interface UserInfo {
  no: string
  name: string
  profileImageUrl: string
}

interface UserState {
  loggedIn: boolean
  deviceId: string
  token: string
  userInfo: UserInfo | null
}

export const defaultUserState = (): UserState => ({
  loggedIn: false,
  deviceId: '',
  token: '',
  userInfo: null
})

export const userState = atom({
  key: "userState",
  default: defaultUserState()
})