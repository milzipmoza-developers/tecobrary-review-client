import {ReactElement, ReactNode} from "react";
import {AdminHeader} from "./AdminHeader";
import DefaultButton from "./DefaultButton";
import styled from "styled-components";
import {Alert, Snackbar} from "@mui/material";
import {useRecoilState} from "recoil";
import {adminAlertStatus} from "../status/AdminAlertStatus";

interface Props {
  children: ReactNode
}

export const AdminFrame = ({children}: Props): ReactElement => {

  const [alertStatus, setAlertStatus] = useRecoilState(adminAlertStatus)

  const handleAlertClose = () => {
    if (alertStatus.open) {
      setAlertStatus({
        ...alertStatus,
        open: !alertStatus.open
      })
    }
  }

  return (
    <>
      <AdminHeader>
        <DefaultButton text="어드민 홈" to={"/admin"}/>
        <DefaultButton text="어드민 도서" to={"/admin/books"}/>
        <DefaultButton text="어드민 카테고리" to={"/admin/categories"}/>
        <DefaultButton text="어드민 태그" to={"/admin/tags"}/>
        <DefaultButton text="어드민 마크" to={"/admin/marks"}/>
        <DefaultButton text="어드민 도서" to={"/admin/books"}/>
        <DefaultButton text="어드민 신간도서" to={"/admin/new-arrivals"}/>
      </AdminHeader>
      <AdminBody>
        {children}
      </AdminBody>
      <Snackbar
        open={alertStatus.open}
        autoHideDuration={alertStatus.duration ? alertStatus.duration : 2000}
        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alertStatus.severity}>
          {alertStatus.message}
        </Alert>
      </Snackbar>
    </>
  )
}

const AdminBody = styled.div`
  padding: 1rem;
`