import React, {ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {Element, ListHeaderProps} from "../../components/ListProps";
import {ActionMenuWrapper} from "../../components/ActionMenuWrapper";
import DefaultButton from "../../components/DefaultButton";
import {
  AppBar,
  Autocomplete,
  AutocompleteValue,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  Paper,
  Toolbar,
  Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search';
import {useRecoilState} from "recoil";
import {AdminAlertColor, adminAlertStatus} from "../../status/AdminAlertStatus";
import styled from "styled-components";
import {Book, SearchBook} from "../../api/book/book.model";
import {PageData, PageRequest} from "../../api/interfaces";
import {BookApi} from "../../api/book/book.service";
import {BookMapper} from "../../api/book/book.mapper";
import {BookPreview} from "../../components/AdminBookPreview";
import {useHistory} from "react-router-dom";


const headers: ListHeaderProps[] = [
  {
    flex: 2,
    name: 'ISBN',
    propName: 'isbn'
  },
  {
    flex: 2,
    name: '제목',
    propName: 'title'
  },
  {
    flex: 2,
    name: '출판사',
    propName: 'publisher'
  },
  {
    flex: 1,
    name: '저자',
    propName: 'author'
  },
  {
    flex: 2,
    name: '출간일',
    propName: 'publishDate'
  }
]

export interface OptionBook {
  isbn: string
  title: string
  publisher: string
  author: string
  imageUrl: string
  description: string,
  publishDate: string
}

function AdminBookPage(): ReactElement {
  const history = useHistory();

  const [alertStatus, setAlertStatus] = useRecoilState(adminAlertStatus)
  const [showDialog, setShowDialog] = useState(false)

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly OptionBook[]>([]);
  const loading = open && options.length === 0;

  const [keyword, setKeyword] = useState('')
  const [selectedBook, setSelectedBook] = useState<OptionBook | null>(null)

  const [pageRequest, setPageRequest] = useState<PageRequest>({
    page: 0,
    size: 10
  })
  const [pageData, setPageData] = useState<PageData<Book>>({
    total: 0,
    size: 0,
    isFirst: true,
    isLast: true,
    items: []
  })

  useEffect(() => {
    QueryAction.getAll()
  }, [pageRequest]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const _init = () => {
    console.log('init')
    setSelectedBook(null)
    setOptions([])
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
        const pageData = await BookApi.getAll(pageRequest)
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
      if (!selectedBook) {
        _showAlert('먼저 도서를 선택해주세요.', 'warning')
        return
      }
      try {
        const result = await BookApi.create({
          isbn: selectedBook.isbn,
          imageUrl: selectedBook.imageUrl,
          title: selectedBook.title,
          publisher: selectedBook.publisher,
          author: selectedBook.author,
          publishDate: selectedBook.publishDate,
          description: selectedBook.description,
        })
        if (result) {
          setShowDialog(false)
          _showAlert('등록에 성공하였습니다.', 'success')
          _init()
          await QueryAction.getAll()
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

  const SearchAction = {
    search: async (): Promise<boolean> => {
      if (keyword.length < 2) {
        _showAlert(`검색어를 두 글자 이상 입력해주세요.`, 'warning', 5000)
        return false
      }
      try {
        const pageData = await BookApi.search(keyword);
        setOptions([...pageData.items]);
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

      const result = await SearchAction.search()
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

    onChangeValue: (e: SyntheticEvent, value: AutocompleteValue<SearchBook, undefined, undefined, undefined>) => {
      if (!value) {
        setSelectedBook(null)
        return
      }
      setSelectedBook(BookMapper.map(value))
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

  const onElementClick = (element: Element) => {
    history.push(`/admin/books/${element.isbn}`)
  }

  return (
    <AdminFrame>
      <Dialog open={showDialog} onClose={DialogAction.hide} fullScreen>
        <AppBar sx={{position: 'relative'}} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={DialogAction.hide}
              aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              새 도서 등록하기
            </Typography>
            <Button color="inherit" onClick={DialogAction.submit}>등록하기</Button>
          </Toolbar>
        </AppBar>
        <SearchInputWrapper>
          <Paper sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 700}}>
            <Autocomplete
              id="search-auto-complete"
              sx={{width: '100%'}}
              open={open}
              onClose={SearchAction.onClose}
              isOptionEqualToValue={(option, value) => option.isbn === value.isbn}
              getOptionLabel={(option) => `${option.title} / ${option.author} / ${option.isbn}`}
              onChange={SearchAction.onChangeValue}
              filterOptions={(x) => x}
              options={options}
              loading={loading}
              renderInput={(params) => {
                const {InputLabelProps, InputProps, ...rest} = params
                return <>
                  <InputBase
                    {...params.InputProps}
                    {...rest}
                    sx={{ml: 1, flex: 2}}
                    placeholder="검색어를 입력하세요."
                    onKeyDown={SearchAction.onEnterPress}
                    value={keyword}
                    onChange={SearchAction.onKeywordChange}
                  />
                </>
              }}
            />
            <IconButton sx={{p: '10px'}} aria-label="search" onClick={SearchAction.search}>
              <SearchIcon/>
            </IconButton>
          </Paper>
        </SearchInputWrapper>
        <DialogContent>
          <BookPreview selectedBook={selectedBook} readonly={true}/>
        </DialogContent>
      </Dialog>
      <ActionMenuWrapper>
        <DefaultButton text={'새 도서 등록하기'} onClick={DialogAction.show}/>
      </ActionMenuWrapper>
      <AdminList title={"도서 목록"} headers={headers}
                 elements={BookMapper.mapToElementProps(pageData.items)}
                 page={pageRequest.page}
                 pageUp={PageAction.pageUp}
                 pageDown={PageAction.pageDown}
                 isFirst={pageData.isFirst}
                 isLast={pageData.isLast}
                 onElementClick={onElementClick}/>
    </AdminFrame>
  )
}

export default AdminBookPage


const SearchInputWrapper = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  display: flex;
  background: rgb(85, 85, 85);
  padding: 32px;
`