import {ReactElement, useEffect} from "react";
import {useHistory} from "react-router-dom";

function NotFoundPage(): ReactElement {
  const history = useHistory();

  useEffect(() => {
    console.log('move to home')
    history.push("/")
  }, [])

  return <></>
}

export default NotFoundPage;