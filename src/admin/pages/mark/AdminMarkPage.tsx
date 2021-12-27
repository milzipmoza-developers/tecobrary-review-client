import {ReactElement} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {AdminList} from "../../components/AdminList";
import {ListHeaderProps} from "../../components/ListProps";

const headers: ListHeaderProps[] = [
  {
    flex: 1,
    name: 'ID',
    propName: 'id'
  }
]

function AdminMarkPage(): ReactElement {
  return (
    <AdminFrame>
      <AdminList title={"마크 정보 조회"} headers={headers}>
        aa
      </AdminList>
    </AdminFrame>
  )
}

export default AdminMarkPage