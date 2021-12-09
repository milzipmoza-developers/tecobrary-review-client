import {ReactElement} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListElementProps, ListHeaderProps} from "../../components/ListProps";
import {colorCodeToReactNode} from "../../components/ColorCodeContainer";

const headers: ListHeaderProps[] = [
  {
    flex: 1,
    name: 'ID',
    propName: 'id'
  },
  {
    flex: 2,
    name: '컬러코드',
    propName: 'colorCode'
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
      id: '1',
      colorCode: colorCodeToReactNode('#000000'),
      name: '객체지향',
      description: '이것은 객체지향 패러다임 카테고리이다.'
    },
    {
      id: '2',
      colorCode: colorCodeToReactNode('#1100EE'),
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