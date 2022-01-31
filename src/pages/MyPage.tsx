import React, {ReactElement, useEffect, useState} from "react";
import {UserPageFrame} from "../components/page/UserPageFrame";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {userState} from "../states/User";
import {useHistory} from "react-router-dom";
import {PageContent} from "../components/page/PageContent";
import Card from "../components/card/Card";
import {MemberMyInfo} from "../api/member/member.model";
import {MemberApi} from "../api/member/member.service";
import {RequestAction, requestTemplate} from "../api";

function MyPage(): ReactElement {

  const [user, setUser] = useRecoilState(userState)
  const history = useHistory()
  const [myInfo, setMyInfo] = useState<MemberMyInfo>()

  useEffect(() => {
    _initPageData()
  }, [])

  const _initPageData = async () => requestTemplate(myPageRequest)

  const myPageRequest: RequestAction = {
    doOnSuccess: async () => {
      const memberMyInfo = await MemberApi.getMyInfo(user.token, user.deviceId);
      setMyInfo(memberMyInfo)
    },
    doOn400Errors: (e) => {
      console.error(e)
    },
    doOn500Errors: (e) => {
      console.error(e)
    },
    doErrors: (e) => {
      console.error(e)
    }
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
    <UserPageFrame top='8rem'>
      <PageContent style={{margin: '3rem 1rem 3rem 1rem'}}>
        <Card backgroundColor='white'
              boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
          <ProfileImage src={myInfo?.member.profileImageUrl}/>
          {JSON.stringify(myInfo)}
        </Card>

        <LogoutWrapper>
          <LogoutText onClick={onClickLogout}>로그아웃</LogoutText>
        </LogoutWrapper>
      </PageContent>
    </UserPageFrame>
  )
}

export default MyPage

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`

const LogoutText = styled.div`
  color: rgb(60, 63, 65);
  cursor: pointer;
  text-decoration: underline;
  margin-top: 16px;
  margin-right: 8px;
  margin-left: auto;
  align-self: flex-end;
  font-size: small;
`