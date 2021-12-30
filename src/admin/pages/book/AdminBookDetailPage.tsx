import React, {ReactElement, useEffect, useState} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {useHistory, useParams} from "react-router-dom";
import {ActionMenuWrapper} from "../../components/ActionMenuWrapper";
import DefaultButton from "../../components/DefaultButton";
import {BookApi} from "../../api/book/book.service";
import {useRecoilState} from "recoil";
import {AdminAlertColor, adminAlertStatus} from "../../status/AdminAlertStatus";
import {Book} from "../../api/book/book.model";
import AdminBookDetail from "../../components/AdminBookDetail";

interface PathParams {
  isbn?: string
}

function AdminBookDetailPage(): ReactElement {
  const {isbn} = useParams<PathParams>()
  const history = useHistory()

  const [alertStatus, setAlertStatus] = useRecoilState(adminAlertStatus)
  const [showDialog, setShowDialog] = useState(false)

  const [readOnly, setReadOnly] = useState(true)

  const [book, setBook] = useState<Book | null>()

  useEffect(() => {
    QueryAction.get()
  }, [isbn])

  const _init = () => {
    console.log('init')
  }

  const _showAlert = (message: string, severity: AdminAlertColor, duration?: number) => {
    setAlertStatus({
      ...alertStatus,
      open: true,
      severity: severity,
      message: message,
      duration: duration
    })
  }

  const QueryAction = {
    get: async () => {
      if (!isbn) {
        _showAlert('도서 정보를 조회할 수 없습니다.', 'warning')
        history.goBack()
        return
      }
      try {
        const result = await BookApi.get(isbn)
        setBook({
          ...result
        })
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
          return
        }

        _showAlert(`조회에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
      }
    }
  }

  const DialogAction = {
    show: () => {
      _init()
      console.log('show', showDialog)
      setShowDialog(true)
    },

    hide: () => {
      setShowDialog(false)
      console.log('hide', showDialog)
      _init()
    },

    init: () => {
      _init()
    },

    submit: async () => {
      try {
        const result = true
        if (result) {
          setShowDialog(false)
          _showAlert('등록에 성공하였습니다.', 'success')
          _init()
          return
        }

        _showAlert('조회에 도중 문제가 발생하였습니다.', 'warning')
        return
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
          return
        }

        _showAlert(`조회에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
      }
    },
  }

  return (
    <AdminFrame>
      <ActionMenuWrapper>
        <DefaultButton text={'도서 수정하기'} onClick={DialogAction.show} disabled={readOnly}/>
        <DefaultButton text={'도서 카테고리 등록하기'} onClick={DialogAction.show}/>
      </ActionMenuWrapper>
      <AdminBookDetail book={book} readOnly={readOnly}/>
    </AdminFrame>
  )
}

export default AdminBookDetailPage
