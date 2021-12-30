import {ReactElement} from "react";
import {AdminFrame} from "../../components/AdminFrame";
import {useParams} from "react-router-dom";

interface PathParams {
  isbn?: string
}

function AdminBookDetailPage(): ReactElement {

  const {isbn} = useParams<PathParams>()

  return (
    <AdminFrame>
      도서상세
      {isbn}
    </AdminFrame>
  )
}

export default AdminBookDetailPage