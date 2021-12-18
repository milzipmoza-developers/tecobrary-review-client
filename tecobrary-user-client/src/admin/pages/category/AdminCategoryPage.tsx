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

  const showDialog = () => {
    console.log('show', dialog)
    setDialog(true)
  }

  const hideDialog = () => {
    console.log('hide', dialog)
    setDialog(false)
  }

  const submitDialog = () => {
    console.log('submit', dialog)
  }

  return (
    <>
      <AdminModal title={'카테고리 등록하기'}
                  show={dialog}
                  onHide={hideDialog}
                  onSubmit={submitDialog}>
        ㅇㅇ
      </AdminModal>
      <AdminFrame>
        <ButtonWrapper>
          <DefaultButton text={'새 카테고리 등록하기'} onClick={showDialog}/>
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
