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
import Plain from "../components/plain/Plain";
import {ChevronDownOutline} from "react-ionicons";
import {BookmarkElement} from "../components/list/BookmarkElement";

function MyPage(): ReactElement {

  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();
  const [myInfo, setMyInfo] = useState<MemberMyInfo>();

  if (!user.loggedIn) {
    history.push("/");
    return <></>;
  }

  useEffect(() => {
    _initPageData();
  }, []);

  const _initPageData = async () => await requestTemplate(myPageRequest);

  const myPageRequest: RequestAction = {
    doOnSuccess: async () => {
      const memberMyInfo = await MemberApi.getMyInfo(user.token, user.deviceId);
      setMyInfo(memberMyInfo);
    },
    doOn400Errors: (e) => {
      console.error(e);
    },
    doOn500Errors: (e) => {
      console.error(e);
    },
    doErrors: (e) => {
      console.error(e);
    }
  };

  const onClickLogout = () => {
    localStorage.removeItem("X-TECOBRARY-AUTH-TOKEN");
    setUser((oldUser) => ({
      ...oldUser,
      loggedIn: false,
      token: '',
      userInfo: null
    }));
    history.replace("/");
  };

  return (
    <UserPageFrame>
      <PageContent style={{margin: '3rem 1rem'}}>
        <Card backgroundColor='white'
              boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
          <ProfileWrapper>
            <ProfileImage src={myInfo?.member.profileImageUrl}/>
            <InfoWrapper>
              <InfoText>{myInfo?.member.name}</InfoText>
              <InfoText>{myInfo?.member.email}</InfoText>
              <InfoText>{myInfo?.member.description}</InfoText>
            </InfoWrapper>
          </ProfileWrapper>
        </Card>
      </PageContent>

      <PageContent style={{margin: '0 1rem'}}>
        <Plain title='북마크 목록을 확인해보세요'>
          <Card
            backgroundColor='white'
            boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
            {myInfo && myInfo.bookmarks && myInfo.bookmarks.length > 0
              ? myInfo.bookmarks.map((it, index) => (
                <div key={index}>
                  <BookmarkElement
                    isbn={it.isbn}
                    title={it.title}
                    imageUrl={it.imageUrl}
                    tags={it.tags}
                    markDateTime={it.markDateTime}
                  />
                  {myInfo.bookmarks.length - 1 != index ? <Margin/> : null}
                </div>
              ))
              : <div style={{
                height: "4rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <div style={{textAlign: "center"}}>책을 북마크에 추가해보세요</div>
              </div>
            }
          </Card>
          {myInfo && myInfo.bookmarks && myInfo.bookmarks.length >= 3
            ? <MoreWrapper>
              <More onClick={() => history.push("/bookmarks")}>
                <ChevronDownOutline color={"white"} height={"22px"}/>
              </More>
            </MoreWrapper>
            : null}
        </Plain>
      </PageContent>

      <PageContent style={{margin: '0 1rem'}}>
        <LogoutWrapper>
          <LogoutText onClick={onClickLogout}>로그아웃</LogoutText>
        </LogoutWrapper>
      </PageContent>
    </UserPageFrame>
  );
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

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`

const InfoText = styled.div`
  margin-bottom: 1rem;
`

const ElementWrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 4rem;
`

const Margin = styled.div`
  height: 1rem;
  width: 100%;
`

const ElementImage = styled.img`
  width: 4rem;
  border-radius: 10%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin-right: 1rem;
`

const ElementBookInfoWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: small;
  margin-top: 6px;
`

const TimeWrapper = styled.div`
  top: 0;
  right: 0;
  position: absolute;
`

const ReviewButtonWrapper = styled.div`
  bottom: 4px;
  right: 0;
  position: absolute;
  z-index: 100;
`
const MoreWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const More = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 2rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom: 0;
  background-color: rgb(44, 62, 80);

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  cursor: pointer;
`