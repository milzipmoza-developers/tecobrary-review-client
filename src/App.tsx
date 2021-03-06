import React, {ReactElement, useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import TimelinePage from "./pages/timeline/TimelinePage";
import MyPage from "./pages/MyPage";
import NotFoundPage from "./pages/NotFoundPage";
import BookDetailPage from "./pages/bookDetail/BookDetailPage";
import HomePage from "./pages/home/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import BookListPage from "./pages/bookList/BookListPage";
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
import {RequestAction, requestTemplate} from "./api";
import ReactGA from 'react-ga';
import BookmarkPage from "./pages/bookmark/BookmarkPage";

interface QueryString {
  code?: string
  status?: string
  action?: string
}

function App(): ReactElement {

  const {code}: QueryString = useQueryString()
  const [storageDeviceId] = useState(localStorage.getItem("X-TECOBRARY-DEVICE-ID") || "")
  const [storageToken] = useState(localStorage.getItem("X-TECOBRARY-AUTH-TOKEN") || "")
  const [user, setUser] = useRecoilState(userState)
  const setPop = useSetRecoilState(popState)

  const history = useHistory()

  useEffect(() => {
    initUserState()
    initAuthentication()
    initDeviceId()
    reroute()
    // initQueryParams()
  }, [])

  useEffect(() => {
    ReactGA.initialize("G-4P9D9VMEDK");
    history.listen((location) => {
      ReactGA.set({page: location.pathname})
      ReactGA.pageview(location.pathname)
    })
  }, [])

  const initUserState = () => {
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
      _requestMemberInfo()
    }
  }

  const _requestMemberInfo = async () => {
    await requestTemplate(loginMemberInfoRequestAction)
  }

  const loginMemberInfoRequestAction: RequestAction = {
    doOnSuccess: async () => {
      const memberInfo = await AuthenticationApi.getMemberInfo(storageDeviceId, storageToken)
      setUser((oldUser) => ({
        ...oldUser,
        userInfo: {
          no: memberInfo.memberNo,
          name: memberInfo.memberName,
          profileImageUrl: memberInfo.profileImageUrl
        }
      }))
      if (history.location.pathname == "/") {
        setPop({message: `${memberInfo.memberName} ??? ??????????????? ????`, open: true, duration: 3000, color: "INFO"})
      }
    },
    doOnAuthError: () => {
      _removeLoginInfo()
      _removeExpiredToken("?????? ????????? ??????????????????. ?????? ?????????????????????.", "WARN")
    },
    doErrors: () => {
      _removeLoginInfo()
      _removeExpiredToken("?????? ?????? ????????? ???????????????. ?????? ?????????????????????.", "ERROR")
    }
  }

  const _removeLoginInfo = () => {
    setUser((oldValue) => ({
      ...oldValue,
      token: "",
      loggedIn: false
    }))
  }

  const _removeExpiredToken = (message: string, color: PopColor) => {
    localStorage.removeItem("X-TECOBRARY-AUTH-TOKEN")
    setPop({message: message, open: true, duration: 3000, color: color})
  }

  const initAuthentication = async () => {
    if (storageToken || storageToken.length != 0) {
      return
    }
    if (code && !Array.isArray(code)) {
      await requestTemplate(authenticationRequest)
    }
  }

  const authenticationRequest: RequestAction = {
    doOnSuccess: async () => {
      if (!code) {
        _removeExpiredToken("?????? ?????? ????????? ???????????????. ?????? ?????????????????????.", "ERROR")
        return
      }
      const memberAuth = await AuthenticationApi.getToken(storageDeviceId, code)
      localStorage.setItem("X-TECOBRARY-AUTH-TOKEN", memberAuth.token)

      const memberInfo = await AuthenticationApi.getMemberInfo(storageDeviceId, memberAuth.token)
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
    },
    doOnAuthError: () => {
      _removeLoginInfo()
      _removeExpiredToken("?????? ????????? ??????????????????. ?????? ?????????????????????.", "WARN")
    },
    doErrors: () => {
      _removeLoginInfo()
      _removeExpiredToken("?????? ?????? ????????? ???????????????. ?????? ?????????????????????.", "ERROR")
    }
  }

  const initDeviceId = async () => {
    if (!storageDeviceId) {
      try {
        const deviceId = await AuthenticationApi.getDeviceId()
        localStorage.setItem("X-TECOBRARY-DEVICE-ID", deviceId)
        setUser({...user, deviceId, loggedIn: false, token: ''})
      } catch (e) {
        setPop({
          message: `??????????????? ????????????`,
          open: true,
          duration: 0,
          color: "WARN",
          actionButton: {name: "????????????", onClick: () => history.go(0)}
        })
      }
    }
  }

  const reroute = () => {
    const referer = localStorage.getItem("X-TECOBRARY-REFERER")
    if (referer) {
      localStorage.removeItem("X-TECOBRARY-REFERER")
      history.push(referer)
    }
  }

  return (
    <>
      <Switch>
        <Route exact path={'/'} component={HomePage}/>
        <Route exact path={'/timeline'} component={TimelinePage}/>
        <Route exact path={'/my-page'} component={MyPage}/>
        <Route exact path={'/reviews'} component={ReviewAddPage}/>
        <Route exact path={'/books/:isbn'} component={BookDetailPage}/>
        {/*<Route exact path={'/books/:bookId/reviews'} component={BookReviewPage}/>*/}
        <Route exact path={'/books'} component={BookListPage}/>
        <Route exact path={'/bookmarks'} component={BookmarkPage}/>
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

