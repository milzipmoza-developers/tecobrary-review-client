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

const elements: ListElementProps[] = [
  {
    data: [
      {
        propName: 'id',
        value: '1'
      },
      {
        propName: 'colorCode',
        value: colorCodeToReactNode('#000000')
      },
      {
        propName: 'name',
        value: '객체지향'
      },
      {
        propName: 'description',
        value: '이것은 객체지향 패러다임 카테고리이다.'
      }
    ],
  },
  {
    data: [
      {
        propName: 'id',
        value: '2'
      },
      {
        propName: 'colorCode',
        value: colorCodeToReactNode('#1188FF')
      },
      {
        propName: 'name',
        value: '리액트'
      },
      {
        propName: 'description',
        value: '메타에서 개발한 프론트 라이브러리'
      }
    ],
  },
  {
    data: [
      {
        propName: 'id',
        value: '3'
      },
      {
        propName: 'colorCode',
        value: colorCodeToReactNode('#EE8811')
      },
      {
        propName: 'name',
        value: '스프링'
      },
      {
        propName: 'description',
        value: '국내에서 가장 많이 사용되는 웹프레임워크'
      }
    ],
  },
]

function AdminCategoryPage(): ReactElement {
  return (
    <AdminFrame>
      <AdminList title={"카테고리 목록"} headers={headers} elements={elements}>
        aa
      </AdminList>
    </AdminFrame>
  )
}

export default AdminCategoryPage