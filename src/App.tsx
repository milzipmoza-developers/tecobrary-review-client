import React, {ReactElement, useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import TimelinePage from "./pages/TimelinePage";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";
import BookDetailPage from "./pages/bookDetail/BookDetailPage";
import HomePage from "./pages/home/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import BookListPage from "./pages/bookList/BookListPage";
import BookReviewPage from "./pages/bookReview/BookReviewPage";
import ReviewAddPage from "./pages/review/ReviewAddPage";
import AdminHomePage from "./admin/pages/AdminHomePage";
import AdminCategoryPage from "./admin/pages/category/AdminCategoryPage";
import AdminMarkPage from "./admin/pages/mark/AdminMarkPage";
import AdminBookPage from "./admin/pages/book/AdminBookPage";
import AdminNewArrivalPage from "./admin/pages/arrival/AdminNewArrivalPage";
import AdminTagPage from "./admin/pages/tag/AdminTagPage";
import AdminBookDetailPage from "./admin/pages/book/AdminBookDetailPage";
import {useRecoilState, useSetRecoilState} from "recoil";
import {userState} from "./states/User";
import {AuthenticationApi} from "./api/authentication/authentication.service";
import {useQueryString} from "./hooks";
import {PopColor, popState} from "./states/Pop";


function App(): ReactElement {

  const {code, status, action} = useQueryString()
  const [storageDeviceId] = useState(localStorage.getItem("X-TECOBRARY-DEVICE-ID") || "")
  const [storageToken] = useState(localStorage.getItem("X-TECOBRARY-AUTH-TOKEN") || "")
  const [user, setUser] = useRecoilState(userState)
  const setPop = useSetRecoilState(popState)

  const history = useHistory()

  useEffect(() => {
    _initUserState()
    _processAuthentication()
    _setDeviceId()
    _removeQueryParams()
  }, [])

  const _removeLoginInfo = () => {
    setUser((oldValue) => ({
      ...oldValue,
      token: "",
      loggedIn: false
    }))
  }

  const _popAuthTokenExpired = (message: string, color: PopColor) => {
    localStorage.removeItem("X-TECOBRARY-AUTH-TOKEN")
    setPop({message: message, open: true, duration: 3000, color: color})
  }

  const _removeQueryParams = () => {
    history.replace({search: undefined})
  }

  const _setDeviceId = async () => {
    if (!storageDeviceId) {
      try {
        const deviceId = await AuthenticationApi.getDeviceId()
        localStorage.setItem("X-TECOBRARY-DEVICE-ID", deviceId)
        setUser({...user, deviceId, loggedIn: false, token: ''})
      } catch (e) {
        setPop({
          message: `새로고침이 필요해요`,
          open: true,
          duration: 0,
          color: "WARN",
          actionButton: {name: "새로고침", onClick: () => history.go(0)}
        })
      }
    }
  }

  const _initUserState = () => {
    if (storageDeviceId) {
      setUser((oldUser) => ({
        ...oldUser,
        deviceId: storageDeviceId,
      }))
    }

    if (storageToken) {
      setUser((oldUser) => ({
        ...oldUser,
        token: storageToken,
        loggedIn: true
      }))
      _loadLoggedInMemberInfo()
    }
  }

  const _processAuthentication = async () => {
    if (storageToken || storageToken.length != 0) {
      return
    }
    if (code && !Array.isArray(code)) {
      try {
        const memberAuth = await AuthenticationApi.getToken(storageDeviceId, code)
        const memberInfo = await AuthenticationApi.getMemberInfo(storageDeviceId, memberAuth.token)
        localStorage.setItem("X-TECOBRARY-AUTH-TOKEN", memberAuth.token)
        setUser((oldUser) => ({
          ...oldUser,
          userInfo: {
            no: memberInfo.memberNo,
            name: memberInfo.memberName,
            profileImageUrl: memberInfo.profileImageUrl
          },
          token: memberAuth.token,
          loggedIn: true
        }))
      } catch (e) {
        if (e.response && e.response.status == 401) {
          _removeLoginInfo()
          _popAuthTokenExpired("인증 정보가 만료되었어요. 다시 로그인해주세요.", "WARN")
          return
        }

        _removeLoginInfo()
        _popAuthTokenExpired("인증 도중 문제가 발생했어요. 다시 로그인해주세요.", "ERROR")
      }
    }
  }

  const _loadLoggedInMemberInfo = async () => {
    try {
      const memberInfo = await AuthenticationApi.getMemberInfo(storageDeviceId, storageToken)
      setUser((oldUser) => ({
        ...oldUser,
        userInfo: {
          no: memberInfo.memberNo,
          name: memberInfo.memberName,
          profileImageUrl: memberInfo.profileImageUrl
        }
      }))
      setPop({message: `${memberInfo.memberName} 님 반갑습니다 😀`, open: true, duration: 3000, color: "INFO"})
      return

    } catch (e) {
      if (e.response && e.response.status == 401) {
        _removeLoginInfo()
        _popAuthTokenExpired("인증 정보가 만료되었어요. 다시 로그인해주세요.", "WARN")
        return
      }

      _removeLoginInfo()
      _popAuthTokenExpired("인증 도중 문제가 발생했어요. 다시 로그인해주세요.", "ERROR")
    }
  }

  return (
    <>
      <Switch>
        <Route exact path={'/'} component={HomePage}/>
        <Route exact path={'/timeline'} component={TimelinePage}/>
        <Route exact path={'/my-page'} component={MyPage}/>
        <Route exact path={'/review'} component={ReviewAddPage}/>
        <Route exact path={'/books/:isbn'} component={BookDetailPage}/>
        <Route exact path={'/books/:bookId/reviews'} component={BookReviewPage}/>
        <Route exact path={'/books'} component={BookListPage}/>
        <Route exact path={'/categories'} component={CategoriesPage}/>

        <Route exact path={'/admin'} component={AdminHomePage}/>
        <Route exact path={'/admin/categories'} component={AdminCategoryPage}/>
        <Route exact path={'/admin/marks'} component={AdminMarkPage}/>
        <Route exact path={'/admin/books/:isbn'} component={AdminBookDetailPage}/>
        <Route exact path={'/admin/books'} component={AdminBookPage}/>
        <Route exact path={'/admin/new-arrivals'} component={AdminNewArrivalPage}/>
        <Route exact path={'/admin/tags'} component={AdminTagPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </>
  )
    ;
}

export default App;

