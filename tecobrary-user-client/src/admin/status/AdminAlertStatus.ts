import {atom} from "recoil";

export type AdminAlertColor = 'success' | 'info' | 'warning' | 'error'

export interface AdminAlertProps {
  open: boolean
  message: string
  severity: AdminAlertColor
  duration?: number
}

const defaultStatus = (): AdminAlertProps => ({
  open: false,
  message: "",
  severity: "info",
})

export const adminAlertStatus = atom({
  key: "adminAlertStatus",
  default: defaultStatus()
})