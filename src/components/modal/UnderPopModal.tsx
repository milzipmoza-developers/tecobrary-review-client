import {ReactElement} from "react";
import styled from "styled-components";
import {ReactComponent as GithubLogo} from '../../assets/github_logo.svg';
import {AuthenticationApi} from "../../api/authentication/authentication.service";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {loginModalState} from "../../states/LoginModal";
import {userState} from "../../states/User";
import {NETWORK_ERROR_DEFAULT, popState, SERVER_ERROR_DEFAULT} from "../../states/Pop";
import {PopupBackground} from "../background/PopupBackground";
import {useHistory} from "react-router-dom";

const UnderPopModal = (): ReactElement | null => {

  const history = useHistory()
  const user = useRecoilValue(userState)
  const [loginModal, setLoginModal] = useRecoilState(loginModalState)
  const setPop = useSetRecoilState(popState)

  const onClick = async () => {
    try {
      window.location.href = await AuthenticationApi.getLoginUrl(user.deviceId)
      localStorage.setItem("X-TECOBRARY-REFERER", history.location.pathname)
    } catch (e) {
      if (e.response) {
        setPop(SERVER_ERROR_DEFAULT)
        return
      }
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const onModalClose = () => {
    setLoginModal({open: false})
  }

  return (
    <PopupBackground active={loginModal.open} onClose={onModalClose}>
      <Wrapper onClick={(e) => e.stopPropagation()}>
        <Card>
          <Title>{loginModal.message ? loginModal.message : '로그인하고 더 많은 기능을 사용해보세요'}</Title>
          <LoginButtons>
            <GithubLogo style={{width: '4rem', height: '4rem', cursor: 'pointer'}} onClick={onClick}/>
          </LoginButtons>
        </Card>
      </Wrapper>
    </PopupBackground>
  )
}

export default UnderPopModal

const Wrapper = styled.div`
  width: 100%;
  max-width: 36rem;
  height: 16rem;
  position: fixed;
  bottom: 0;
  z-index: 301;
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
