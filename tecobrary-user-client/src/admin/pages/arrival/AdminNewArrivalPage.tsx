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

function AdminNewArrivalPage(): ReactElement {
  return (
    <AdminFrame>
      <AdminList title={"신간 도서 목록"} headers={headers}>
        aa
      </AdminList>
    </AdminFrame>
  )
}

export default AdminNewArrivalPage