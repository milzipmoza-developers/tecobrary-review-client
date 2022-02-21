import {ReactElement} from "react";
import {UserPageFrame} from "../../components/page/UserPageFrame";
import {PageContent} from "../../components/page/PageContent";
import {useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "../../states/User";
import {useHistory} from "react-router-dom";
import {loginModalState} from "../../states/LoginModal";
import Plain from "../../components/plain/Plain";

function BookmarkPage(): ReactElement {

  const [user, setUser] = useRecoilState(userState)
  const history = useHistory()
  const setLoginModal = useSetRecoilState(loginModalState)

  if (!user.loggedIn) {
    history.push("/")
    setLoginModal({open: true, message: "로그인하면 북마크 목록을 확인할 수 있어요"})
  }

  return (
    <UserPageFrame header={{useProfileButton: true, useBackButton: true}}>
      <PageContent style={{margin: '3rem 1rem 0rem 1rem'}}>
        <Plain title="모든 리뷰를 모아볼 수 있어요"
               margin='0 1rem'>
        </Plain>
      </PageContent>
    </UserPageFrame>
  )
}

export default BookmarkPage;