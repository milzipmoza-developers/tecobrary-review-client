import {ReactElement} from "react";
import styled from "styled-components";
import {ReactComponent as GithubLogo} from '../../assets/github_logo.svg';
import {MemberApi} from "../../api/member/member.service";
import {useRecoilState} from "recoil";
import {loginModalState} from "../../states/LoginModal";
import {userState} from "../../states/User";

const box_active = {
  transition: "opacity 300ms",
};

const box_hidden = {
  opacity: "0",
  visibility: "hidden",
  transition: "opacity 300ms, visibility 300ms",
};

const UnderPopModal = (): ReactElement | null => {

  const [user, setUser] = useRecoilState(userState)
  const [loginModal, setLoginModal] = useRecoilState(loginModalState)

  const onClick = async () => {
    try {
      const url = await MemberApi.getLoginUrl(user.deviceId)
      window.location.href = url
    } catch (e) {

      console.error("error")
    }
  }

  // useLockBodyScroll()

  return <>
    <Background onClick={() => setLoginModal({open: false})} style={loginModal.open ? box_active : box_hidden}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Card>
          <Title>Github 로그인을 하시면 더 많은 정보를 확인하실 수 있어요</Title>
          <LoginButtons>
            <GithubLogo style={{width: '4rem', height: '4rem', cursor: 'pointer'}} onClick={onClick}/>
          </LoginButtons>
        </Card>
      </Wrapper>
    </Background>
  </>
}

export default UnderPopModal

const Background = styled.div`
  width: 100%;
  max-width: 36rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 36rem;
  height: 24vh;
  position: fixed;
  bottom: 0;
  z-index: 100;
`

const Card = styled.div`
  width: 100%;
  max-width: 36rem;
  height: 100%;
  box-sizing: border-box;
  border-radius: 2rem 2rem 0 0;
  background-color: #ecf0f1;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 2rem;
`

const Title = styled.div`
  font-weight: bold;
  font-size: large;
`

const LoginButtons = styled.div`
  height: 4rem;
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  justify-content: center;
`
