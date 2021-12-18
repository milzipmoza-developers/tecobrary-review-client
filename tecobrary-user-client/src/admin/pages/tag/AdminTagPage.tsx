import {ReactElement} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListElementProps, ListHeaderProps} from "../../components/ListProps";
import {colorCodeToReactNode} from "../../components/ColorCodeContainer";

const headers: ListHeaderProps[] = [
  {
    flex: 1,
    name: 'NO',
    propName: 'no'
  },
  {
    flex: 2,
    name: '배경색',
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
      no: '1',
      colorCode: colorCodeToReactNode('#000000'),
      name: '객체지향',
      description: '이것은 객체지향 패러다임 카테고리이다.'
    },
    {
      no: '2',
      colorCode: colorCodeToReactNode('#009900'),
      name: '절차지향',
      description: '이것은 절차지향 패러다임 카테고리이다.'
    },
  ]
}

function AdminMarkPage(): ReactElement {
  return (
    <AdminFrame>
      <AdminList title={"태그 정보 조회"} headers={headers} elements={elements}/>
    </AdminFrame>
  )
}

export default AdminMarkPage