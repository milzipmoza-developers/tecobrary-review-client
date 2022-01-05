import React, {ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {useHistory, useParams} from "react-router-dom";
import {ActionMenuWrapper} from "../../components/ActionMenuWrapper";
import DefaultButton from "../../components/DefaultButton";
import {BookApi} from "../../api/book/book.service";
import {useRecoilState} from "recoil";
import {AdminAlertColor, adminAlertStatus} from "../../status/AdminAlertStatus";
import {Book} from "../../api/book/book.model";
import AdminBookDetail from "../../components/AdminBookDetail";
import {
  AppBar,
  Autocomplete,
  AutocompleteValue,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import {Category} from "../../api/category/category.model";
import {CategoryApi} from "../../api/category/category.service";
import {Tag} from "../../api/tag/tag.model";
import {TagApi} from "../../api/tag/tag.service";

interface PathParams {
  isbn?: string
}

function AdminBookDetailPage(): ReactElement {
  const {isbn} = useParams<PathParams>()
  const history = useHistory()

  const [alertStatus, setAlertStatus] = useRecoilState(adminAlertStatus)

  const [readOnly, setReadOnly] = useState(true)
  const [book, setBook] = useState<Book>()

  const [open, setOpen] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [options, setOptions] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>()

  const [tagOpen, setTagOpen] = useState(false)
  const [showTagDialog, setShowTagDialog] = useState(false)
  const [tagName, setTagName] = useState('')
  const [tagOptions, setTagOptions] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])


  useEffect(() => {
    Query.get()
  }, [isbn])

  const _init = () => {
    setSelectedCategory(undefined)
    setSelectedTags([])
    setKeyword('')
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

  const Query = {
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

  const BookAction = {
    clear: async () => {
      if (!isbn || !book?.category) {
        _showAlert(`이미 카테고리가 설정되지 않은 도서입니다.`, 'warning', 5000)
        return
      }

      try {
        const result = await BookApi.clearCategory(isbn)

        if (result) {
          _showAlert('도서 카테고리 해제에 성공하였습니다.', 'success')
          _init()
          Query.get()
          return
        }

        _showAlert('도서 카테고리 해제 도중 문제가 발생하였습니다.', 'warning')
        return
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
          return
        }

        _showAlert(`도서 카테고리 해제에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
      }
    }
  }

  const PageAction = {
    editable: () => {
      console.log('editable')
    }
  }

  const CategoryAction = {
    show: () => {
      _init()
      console.log('show', showDialog)
      setShowDialog(true)
    },

    hide: () => {
      setShowDialog(false)
      _init()
    },

    init: () => {
      _init()
    },

    submit: async () => {
      try {
        if (!isbn || !selectedCategory) {
          return
        }
        const result = await BookApi.addCategory(isbn, {
          no: selectedCategory.no,
          name: selectedCategory.name,
          imageUrl: selectedCategory.imageUrl
        })
        if (result) {
          setShowDialog(false)
          _showAlert('등록에 성공하였습니다.', 'success')
          _init()
          Query.get()
          return
        }

        _showAlert('도서 카테고리 등록 도중 문제가 발생하였습니다.', 'warning')
        return
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
          return
        }

        _showAlert(`도서 카테고리 등록에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
      }
    },
  }

  const TagAction = {
    show: () => {
      _init()
      console.log('show tag dialog', showDialog)
      setShowTagDialog(true)
    },

    hide: () => {
      setShowTagDialog(false)
      _init()
    },

    init: () => {
      _init()
    },

    submit: async () => {
      try {
        if (!isbn || selectedTags.length == 0) {
          return
        }
        const result = await BookApi.addTags(isbn, selectedTags.map(it => ({
          no: it.no,
          name: it.name,
          colorCode: it.colorCode
        })))
        if (result) {
          setShowTagDialog(false)
          _showAlert('등록에 성공하였습니다.', 'success')
          _init()
          Query.get()
          return
        }

        _showAlert('도서 태그 등록 도중 문제가 발생하였습니다.', 'warning')
        return
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
          return
        }

        _showAlert(`도서 태그 등록에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
      }
    },
  }

  const CategorySearch = {
    search: async (): Promise<boolean> => {
      try {
        const pageData = await CategoryApi.get(
          {page: 0, size: 10},
          {keyword}
        )
        setOptions([...pageData.items])
        return true
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
        }

        _showAlert(`조회에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
        return false
      }
    },

    onEnterPress: async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode != 13) {
        return
      }

      const result = await CategorySearch.search()
      if (!result) {
        return
      }
      setOpen(true)
    },

    onClose: async () => {
      setOpen(false)
      setOptions([])
    },

    onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
    },

    onChangeValue: (e: SyntheticEvent, value: AutocompleteValue<Category, undefined, undefined, undefined>) => {
      if (!value) {
        setSelectedCategory(undefined)
        return
      }
      setSelectedCategory({...value})
    }
  }

  const TagSearch = {
    search: async (): Promise<boolean> => {
      if (!book) {
        return false
      }
      try {
        const pageData = await TagApi.getAllAddable(
          {page: 0, size: 10},
          tagName,
          book.isbn
        )
        setTagOptions([...pageData.items])
        return true
      } catch (e) {
        if (e.response && (400 <= e.response.status && e.response.status < 500)) {
          _showAlert(`${e.response.data.message}`, 'warning', 5000)
        }

        _showAlert(`조회에 실패하였습니다. 사유 : ${e.message}`, 'error', 5000)
        return false
      }
    },

    onEnterPress: async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode != 13) {
        return
      }

      const result = await TagSearch.search()
      if (!result) {
        return
      }
      setTagOpen(true)
    },

    onClose: async () => {
      setTagOpen(false)
      setTagOptions([])
    },

    onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => {
      setTagName(e.target.value)
    },

    onChangeValue: (e: SyntheticEvent, value: AutocompleteValue<Tag, undefined, undefined, undefined>) => {
      if (!value) {
        return
      }

      const tag = selectedTags.find(it => it.no == value.no);
      if (tag) {
        return;
      }
      selectedTags.push(value)
      setSelectedTags(selectedTags)
    }
  }

  return (
    <AdminFrame>
      <Dialog open={showDialog} onClose={CategoryAction.hide} fullWidth>
        <AppBar sx={{position: 'relative'}} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={CategoryAction.hide}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              도서 카테고리 등록하기
            </Typography>
          </Toolbar>
        </AppBar>
        <SearchInputWrapper>
          <Paper sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 700}}>
            <Autocomplete
              id="search-auto-complete"
              sx={{width: '100%'}}
              open={open}
              onClose={CategorySearch.onClose}
              isOptionEqualToValue={(option, value) => option.no === value.no}
              getOptionLabel={(option) => `${option.name}`}
              onChange={CategorySearch.onChangeValue}
              filterOptions={(x) => x}
              options={options}
              renderInput={(params) => {
                const {InputLabelProps, InputProps, ...rest} = params
                return <>
                  <InputBase
                    {...params.InputProps}
                    {...rest}
                    sx={{ml: 1, flex: 2}}
                    placeholder="검색어를 입력하세요."
                    onKeyDown={CategorySearch.onEnterPress}
                    value={keyword}
                    onChange={CategorySearch.onKeywordChange}
                  />
                </>
              }}
            />
            <IconButton sx={{p: '10px'}} aria-label="search" onClick={CategorySearch.search}>
              <SearchIcon/>
            </IconButton>
          </Paper>
        </SearchInputWrapper>
        <DialogContent>
          {JSON.stringify(selectedCategory)}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={CategoryAction.hide}>취소하기</Button>
          <Button variant="contained" color="success" onClick={CategoryAction.submit}>등록하기</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showTagDialog} onClose={TagAction.hide} fullWidth>
        <AppBar sx={{position: 'relative'}} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={TagAction.hide}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              도서 태그 등록하기
            </Typography>
          </Toolbar>
        </AppBar>
        <SearchInputWrapper>
          <Paper sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 700}}>
            <Autocomplete
              id="search-auto-complete"
              sx={{width: '100%'}}
              open={tagOpen}
              onClose={TagSearch.onClose}
              isOptionEqualToValue={(option, value) => option.no === value.no}
              getOptionLabel={(option) => `${option.name}`}
              onChange={TagSearch.onChangeValue}
              filterOptions={(x) => x}
              options={tagOptions}
              renderInput={(params) => {
                const {InputLabelProps, InputProps, ...rest} = params
                return <>
                  <InputBase
                    {...params.InputProps}
                    {...rest}
                    sx={{ml: 1, flex: 2}}
                    placeholder="검색어를 입력하세요."
                    onKeyDown={TagSearch.onEnterPress}
                    value={tagName}
                    onChange={TagSearch.onKeywordChange}
                  />
                </>
              }}
            />
            <IconButton sx={{p: '10px'}} aria-label="search" onClick={TagSearch.search}>
              <SearchIcon/>
            </IconButton>
          </Paper>
        </SearchInputWrapper>
        <DialogContent>
          {JSON.stringify(tagOptions)}
          <br/>
          <br/>
          <div>선택된 태그</div>
          {JSON.stringify(selectedTags)}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={TagAction.hide}>취소하기</Button>
          <Button variant="contained" color="success" onClick={TagAction.submit}>등록하기</Button>
        </DialogActions>
      </Dialog>
      <ActionMenuWrapper>
        <DefaultButton text={'도서 수정하기'} onClick={CategoryAction.show} disabled={readOnly}/>
        <DefaultButton text={'도서 카테고리 수정하기'} onClick={CategoryAction.show}/>
        <DefaultButton text={'도서 카테고리 해제하기'} onClick={BookAction.clear} disabled={!book?.category}/>
        <DefaultButton text={'도서 태그 추가하기'} onClick={TagAction.show}/>
      </ActionMenuWrapper>
      <AdminBookDetail book={book} readOnly={readOnly}/>
    </AdminFrame>
  )
}

export default AdminBookDetailPage

const SearchInputWrapper = styled.div`
  //width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
  background: rgb(85, 85, 85);
  padding: 32px;
`