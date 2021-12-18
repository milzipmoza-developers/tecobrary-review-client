import {ReactElement} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListElementProps, ListHeaderProps} from "../../components/ListProps";

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
  return (
    <AdminFrame>
      <AdminList title={"카테고리 목록"} headers={headers} elements={elements}/>
    </AdminFrame>
  )
}

export default AdminCategoryPage