import {ReactElement, ReactNode} from "react";
import {AdminHeader} from "./AdminHeader";
import DefaultButton from "./DefaultButton";
import styled from "styled-components";

interface Props {
  children: ReactNode
}

export const AdminFrame = ({children}: Props): ReactElement => {

  return (
    <>
      <AdminHeader>
        <DefaultButton text="어드민 홈" to={"/admin"}/>
        <DefaultButton text="어드민 카테고리" to={"/admin/categories"}/>
        <DefaultButton text="어드민 마크" to={"/admin/marks"}/>
        <DefaultButton text="어드민 도서" to={"/admin/books"}/>
        <DefaultButton text="어드민 신간도서" to={"/admin/new-arrivals"}/>
      </AdminHeader>
      <AdminBody>
        {children}
      </AdminBody>
    </>
  )
}

const AdminBody = styled.div`
  padding: 1rem;
`