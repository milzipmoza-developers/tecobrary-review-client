import React from "react";
import {UserPageFrame} from "../components/page/UserPageFrame";
import styled from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {loginModalState} from "../states/LoginModal";
import {userState} from "../states/User";

function MyPage() {

  const [loginModal, setLoginModal] = useRecoilState(loginModalState)
  const user = useRecoilValue(userState)

  const onClick = () => {
    setLoginModal({open: true})
  }

  return (
    <UserPageFrame>
      {JSON.stringify(user)}
      <LoginButton onClick={onClick}>로그인</LoginButton>
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