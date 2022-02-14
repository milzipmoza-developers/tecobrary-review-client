import React, {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListHeaderProps} from "../../components/ListProps";
import {ActionMenuWrapper} from "../../components/ActionMenuWrapper";
import DefaultButton from "../../components/DefaultButton";
import {useRecoilState} from "recoil";
import {AdminAlertColor, adminAlertStatus} from "../../status/AdminAlertStatus";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Tag, TagInput} from "../../api/tag/tag.model";
import {TagApi} from "../../api/tag/tag.service";
import {PageData, PageRequest} from "../../api/interfaces";
import {TagMapper} from "../../api/tag/tag.mapper";
import {HexColorPicker} from "react-colorful";
import {adminTagPageStatus} from "../../status/AdminTagPageStatus";

const headers: ListHeaderProps[] = [
  {
    flex: 1,
    name: 'NO',
    propName: 'no'
  },
  {
    flex: 1,
    name: '배경색',
    propName: 'color'
  },
  {
    flex: 1,
    name: '이름',
    propName: 'name'
  },
  {
    flex: 1,
    name: '설명',
    propName: 'description'
  }
]

function AdminMarkPage(): ReactElement {
  const [alertStatus, setAlertStatus] = useRecoilState(adminAlertStatus)
  const [pageStatus, setPageStatus] = useRecoilState(adminTagPageStatus)

  const [showDialog, setShowDialog] = useState(false)
  const [pageData, setPageData] = useState<PageData<Tag>>({
    total: 0,
    size: 0,
    isFirst: true,
    isLast: true,
    items: []
  })
  const [inputs, setInputs] = useState<TagInput>({
    colorCode: '#000000',
    name: '',
    description: '',
  })

  useEffect(() => {
    QueryAction.getAll()
  }, [pageStatus]);

  const _init = () => {
    setInputs({
      colorCode: '',
      name: '',
      description: '',
    })
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
    getAll: async () => {
      try {
        const pageData = await TagApi.get(pageStatus, {});
        setPageData({...pageData})
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
          return
        }

        _showAlert(`조회에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
      }
    }
  }

  const PageAction = {
    pageUp: () => {
      const {isLast} = pageData
      if (isLast) {
        return
      }
      setPageStatus((old) => ({
        ...old,
        page: old.page + 1
      }))
    },

    pageDown: () => {
      const {isFirst} = pageData
      const {page} = pageStatus

      if (isFirst) {
        return
      }
      if (page > 0) {
        setPageStatus((old) => ({
          ...old,
          page: old.page - 1
        }))
      }
    }
  }

  const InputAction = {
    onColorCodeChange: (e: ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        colorCode: e.target.value
      })
    },

    onNameChange: (e: ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        name: e.target.value
      })
    },

    onDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        description: e.target.value
      })
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

    submit: async () => {
      try {
        const result = await TagApi.create({
          colorCode: inputs.colorCode,
          name: inputs.name,
          description: inputs.description,
        })
        if (result) {
          setShowDialog(false)
          _showAlert('등록에 성공하였습니다.', 'success')
          _init()
          await QueryAction.getAll()
          return
        }

        _showAlert('등록에 도중 문제가 발생하였습니다.', 'warning')
        return
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
          return
        }

        _showAlert(`등록에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
      }
    }
  }

  return (
    <AdminFrame>
      <Dialog open={showDialog} onClose={DialogAction.hide} fullWidth>
        <DialogTitle>카테고리 등록</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-required"
            label="이름"
            fullWidth
            margin="normal"
            value={inputs.name}
            onChange={InputAction.onNameChange}
          />
          <TextField
            required
            id="outlined-required"
            label="설명"
            fullWidth
            margin="normal"
            value={inputs.description}
            onChange={InputAction.onDescriptionChange}
          />
          <TextField
            required
            id="outlined-required"
            label="컬러코드"
            fullWidth
            margin="normal"
            value={inputs.colorCode}
            onChange={InputAction.onColorCodeChange}
          />
          <HexColorPicker color={inputs.colorCode} onChange={(newColor) => setInputs({
            ...inputs,
            colorCode: newColor.toUpperCase()
          })}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={DialogAction.hide}>취소하기</Button>
          <Button variant="contained" color="success" onClick={DialogAction.submit}>등록하기</Button>
        </DialogActions>
      </Dialog>
      <ActionMenuWrapper>
        <DefaultButton text={'새 태그 등록하기'} onClick={DialogAction.show}/>
      </ActionMenuWrapper>
      <AdminList title={"태그 정보 조회"}
                 headers={headers}
                 elements={TagMapper.mapper(pageData.items)}
                 page={pageStatus.page}
                 pageUp={PageAction.pageUp}
                 pageDown={PageAction.pageDown}
                 isFirst={pageData.isFirst}
                 isLast={pageData.isLast}/>
    </AdminFrame>
  )
}

export default AdminMarkPage