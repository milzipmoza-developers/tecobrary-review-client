import {ReactElement, useState} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListElementProps, ListHeaderProps} from "../../components/ListProps";
import styled from "styled-components";
import DefaultButton from "../../components/DefaultButton";
import {AdminModal} from "../../components/AdminModal";

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

function AdminCategoryPage(): ReactElement {
  const [dialog, setDialog] = useState(false)

  const [categoryName, setCategoryName] = useState('category name')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [categoryImageUrl, setCategoryImageUrl] = useState('')

  const _init = () => {
    setCategoryName('')
    setCategoryDescription('')
    setCategoryImageUrl('')
  }

  const Dialog = {
    show: () => {
      console.log('show', dialog)
      setDialog(true)
    },

    hide: () => {
      console.log('hide', dialog)
      setDialog(false)
      _init()
    },

    submit: () => {
      console.log('submit', dialog)
      _init()
    }
  }

  return (
    <>
      <AdminModal title={'카테고리 등록하기'}
                  show={dialog}
                  onHide={Dialog.hide}
                  onSubmit={Dialog.submit}>
      </AdminModal>
      <AdminFrame>
        <ButtonWrapper>
          <DefaultButton text={'새 카테고리 등록하기'} onClick={Dialog.show}/>
        </ButtonWrapper>
        <AdminList title={"카테고리 목록"} headers={headers} elements={elements}/>
      </AdminFrame>
    </>
  )
}

export default AdminCategoryPage

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
`
