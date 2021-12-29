import {ChangeEvent, ReactElement, useEffect, useState} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListHeaderProps} from "../../components/ListProps";
import DefaultButton from "../../components/DefaultButton";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useRecoilState} from "recoil";
import {AdminAlertColor, adminAlertStatus} from "../../status/AdminAlertStatus";
import {CategoryApi} from "../../api/category/category.service";
import {PageData, PageRequest} from "../../api/interfaces";
import {Category, CategoryInput} from "../../api/category/category.model";
import {CategoryMapper} from "../../api/category/category.mapper";
import {ActionMenuWrapper} from "../../components/ActionMenuWrapper";

const headers: ListHeaderProps[] = [
  {
    flex: 1,
    name: 'NO',
    propName: 'no'
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
  },
  {
    flex: 1,
    name: '이미지',
    propName: 'image'
  }
]

function AdminCategoryPage(): ReactElement {
  const [alertStatus, setAlertStatus] = useRecoilState(adminAlertStatus)

  const [showDialog, setShowDialog] = useState(false)
  const [pageRequest, setPageRequest] = useState<PageRequest>({
    page: 0,
    size: 10
  })
  const [pageData, setPageData] = useState<PageData<Category>>({
    total: 0,
    size: 0,
    isFirst: true,
    isLast: true,
    items: []
  })
  const [inputs, setInputs] = useState<CategoryInput>({
    name: '',
    description: '',
    imageUrl: ''
  })

  useEffect(() => {
    QueryAction.getAll()
  }, [pageRequest]);

  const _init = () => {
    setInputs({
      name: '',
      description: '',
      imageUrl: ''
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
        const pageData = await CategoryApi.get(pageRequest);
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
        const result = await CategoryApi.create({
          name: inputs.name,
          description: inputs.description,
          imageUrl: inputs.imageUrl
        });
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

  const PageAction = {
    pageUp: () => {
      const {isLast} = pageData
      if (isLast) {
        return
      }
      setPageRequest({
        ...pageRequest,
        page: pageRequest.page + 1
      })
    },

    pageDown: () => {
      const {isFirst} = pageData
      const {page} = pageRequest

      if (isFirst) {
        return
      }
      if (page > 0) {
        setPageRequest({
          ...pageRequest,
          page: pageRequest.page - 1
        })
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
      <ActionMenuWrapper>
        <DefaultButton text={'새 카테고리 등록하기'} onClick={DialogAction.show}/>
      </ActionMenuWrapper>
      <AdminList title={"카테고리 목록"}
                 headers={headers}
                 elements={CategoryMapper.mapper(pageData.items)}
                 page={pageRequest.page}
                 pageUp={PageAction.pageUp}
                 pageDown={PageAction.pageDown}
                 isFirst={pageData.isFirst}
                 isLast={pageData.isLast}/>
    </AdminFrame>
  )
}

export default AdminCategoryPage

