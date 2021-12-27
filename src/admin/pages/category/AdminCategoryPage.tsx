import {ChangeEvent, ReactElement, useState} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListElementProps, ListHeaderProps} from "../../components/ListProps";
import styled from "styled-components";
import DefaultButton from "../../components/DefaultButton";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {AdminAlertColor, adminAlertStatus} from "../../status/AdminAlertStatus";

const headers: ListHeaderProps[] = [
  {
    flex: 1,
    name: 'NO',
    propName: 'no'
  },
  {
    flex: 2,
    name: '이름',
    propName: 'name'
  },
  {
    flex: 2,
    name: '설명',
    propName: 'description'
  }
]

const elements: ListElementProps = {
  data: [
    {
      no: '1',
      name: '객체지향',
      description: '이것은 객체지향 패러다임 카테고리이다.'
    },
    {
      no: '2',
      name: '객체지향',
      description: '이것은 객체지향 패러다임 카테고리이다.'
    },
  ]
}

interface CategoryInput {
  name: string
  description: string
  imageUrl: string
}

function AdminCategoryPage(): ReactElement {
  const [alertStatus, setAlertStatus] = useRecoilState(adminAlertStatus)

  const [showDialog, setShowDialog] = useState(false)
  const [inputs, setInputs] = useState<CategoryInput>({
    name: '',
    description: '',
    imageUrl: ''
  })

  const _init = () => {
    setInputs({
      name: '',
      description: '',
      imageUrl: ''
    })
  }

  const _showAlert = (message: string, severity: AdminAlertColor) => {
    setAlertStatus({
      ...alertStatus,
      open: true,
      severity: severity,
      message: message
    })
  }

  const InputAction = {
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
    },

    onImageUrlChange: (e: ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        imageUrl: e.target.value
      })
    }
  }

  const DialogAction = {
    show: () => {
      console.log('show', showDialog)
      setShowDialog(true)
    },

    hide: () => {
      console.log('hide', showDialog)
      setShowDialog(false)
      _init()
    },

    submit: () => {
      console.log('submit', inputs)
      setShowDialog(false)
      _showAlert('등록에 성공하였습니다.', 'success')
      _init()
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
            label="이미지"
            fullWidth
            margin="normal"
            value={inputs.imageUrl}
            onChange={InputAction.onImageUrlChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={DialogAction.hide}>취소하기</Button>
          <Button variant="contained" color="success" onClick={DialogAction.submit}>등록하기</Button>
        </DialogActions>
      </Dialog>
      <ButtonWrapper>
        <DefaultButton text={'새 카테고리 등록하기'} onClick={DialogAction.show}/>
      </ButtonWrapper>
      <AdminList title={"카테고리 목록"} headers={headers} elements={elements}/>
    </AdminFrame>
  )
}

export default AdminCategoryPage

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
`
