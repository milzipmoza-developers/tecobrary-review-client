import {atom} from "recoil";

export type PopColor = "ERROR" | "WARN" | "SUCCESS" | "INFO"

export const popColors = {
  ERROR: {
    box: "#FFBCBC",
  },
  WARN: {
    box: "#FDFFAB",
  },
  SUCCESS: {
    box: "#C6EBC9",
  },
  INFO: {
    box: "#D6E5FA",
  }
}

export const NETWORK_ERROR_DEFAULT: Pop = {
  message: "네트워크 연결을 확인해주세요.",
  open: true,
  duration: 3000,
  color: "ERROR"
}

export const SERVER_ERROR_DEFAULT: Pop = {
  message: "서버에 문제가 발생했어요. 신속하게 확인해볼께요.",
  open: true,
  duration: 3000,
  color: "ERROR"
}

export const CLOSE: Pop = {
  message: "",
  open: false,
  duration: 0,
  color: "INFO"
}

interface Pop {
  message: string
  open: boolean
  duration: number
  color: PopColor
  actionButton?: PopActionButton
}

interface PopActionButton {
  name: string
  onClick: () => void
}

const defaultState = (): Pop => ({
  message: "",
  open: false,
  duration: 0,
  color: "INFO"
})

export const popState = atom({
  key: "popState",
  default: defaultState()
})

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parse = (popColor: PopColor) => {
  return popColors[popColor]
}
