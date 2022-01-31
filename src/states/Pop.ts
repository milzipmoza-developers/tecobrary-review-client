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
    box: "#C1FFD7",
  },
  INFO: {
    box: "#D6E5FA",
  }
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

export const parse = (popColor: PopColor) => {
  return popColors[popColor]
}
