import {Timeline} from "../model/timeline";
import {atom} from "recoil";

interface State {
  firstContent?: string
  hasMore: boolean
  contents: Timeline[]
}

const defaultState: State = {
  hasMore: false,
  contents: []
}

export const timelineState = atom({
  key: "timelineState",
  default: defaultState,
})