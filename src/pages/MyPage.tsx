import React, {ReactElement} from "react";
import {UserPageFrame} from "../components/page/UserPageFrame";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {loginModalState} from "../states/LoginModal";
import {userState} from "../states/User";

function MyPage(): ReactElement {

  const [loginModal, setLoginModal] = useRecoilState(loginModalState)
  const [user, setUser] = useRecoilState(userState)

  const onClick = () => {
    setLoginModal({open: true})
  }

  const onClickLogout = () => {
    setUser({
      loggedIn: false,
      deviceId: '',
      token: '',
      userInfo: null
    })
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