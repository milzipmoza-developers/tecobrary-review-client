import {ReactElement} from "react";
import styled from "styled-components";
import {ReactComponent as GithubLogo} from '../../assets/github_logo.svg';
import {AuthenticationApi} from "../../api/authentication/authentication.service";
import {useRecoilState, useRecoilValue} from "recoil";
import {loginModalState} from "../../states/LoginModal";
import {userState} from "../../states/User";
import {useLockBodyScroll} from "../../hooks";

const box_active = {
  transition: "opacity 300ms",
};

const box_hidden = {
  opacity: "0",
  visibility: "hidden",
  transition: "opacity 300ms, visibility 300ms",
};

const UnderPopModal = (): ReactElement | null => {

  const user = useRecoilValue(userState)
  const [loginModal, setLoginModal] = useRecoilState(loginModalState)

  const onClick = async () => {
    try {
      const url = await AuthenticationApi.getLoginUrl(user.deviceId)
      window.location.href = url
    } catch (e) {

      console.error("error")
    }
  }

  const onModalClose = () => {
    setLoginModal({open: false})
  }

  const OpenedModal = () => {
    useLockBodyScroll()

    return (
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Card>
          <Title>로그인하고 더 많은 기능을 사용해보세요</Title>
          <LoginButtons>
            <GithubLogo style={{width: '4rem', height: '4rem', cursor: 'pointer'}} onClick={onClick}/>
          </LoginButtons>
        </Card>
      </Wrapper>
    )
  }

  return <>
    <Background onClick={onModalClose} style={loginModal.open ? box_active : box_hidden}>
      {loginModal.open ? <OpenedModal/> : null}
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
  height: 16rem;
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
  margin-top: 2rem;
  justify-content: center;
`
