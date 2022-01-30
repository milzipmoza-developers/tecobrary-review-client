import React, {ReactElement} from "react";
import {UserPageFrame} from "../components/page/UserPageFrame";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {loginModalState} from "../states/LoginModal";
import {userState} from "../states/User";
import {useHistory} from "react-router-dom";

function MyPage(): ReactElement {

  const [loginModal, setLoginModal] = useRecoilState(loginModalState)
  const [user, setUser] = useRecoilState(userState)
  const history = useHistory()

  const onClick = () => {
    setLoginModal({open: true})
  }

  const onClickLogout = () => {
    localStorage.removeItem("X-TECOBRARY-AUTH-TOKEN")
    setUser((oldUser) => ({
      ...oldUser,
      loggedIn: false,
      token: '',
      userInfo: null
    }));
  }

  if (!user.loggedIn) {
    history.push("/")
  }

  return (
    <UserPageFrame>
      {JSON.stringify(user)}
      <LoginButton onClick={onClick}>로그인</LoginButton>
      <LoginOutButton onClick={onClickLogout}>로그아웃</LoginOutButton>
    </UserPageFrame>
  )
}

export default MyPage

const LoginButton = styled.div`
  background: pink;
  color: black;
  width: 50px;
  height: 50px;
`

const LoginOutButton = styled.div`
  background: cyan;
  color: black;
  width: 50px;
  height: 50px;
`