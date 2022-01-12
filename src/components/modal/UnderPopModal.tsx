import {ReactElement} from "react";
import styled from "styled-components";
import {useLockBodyScroll} from "../../hooks";
import { ReactComponent as GithubLogo } from '../../assets/github_logo.svg';

const UnderPopModal = (): ReactElement | null => {
  if(false) {
    return null
  }

  useLockBodyScroll()

  return (
    <Wrapper>
      <Card>
        <Title>Github 로그인하시면 더 많은 정보를 확인하실 수 있어요</Title>
        <LoginButtons>
        <GithubLogo style={{width: '4rem', height: '4rem', cursor: 'pointer'}}/>
        </LoginButtons>
      </Card>
    </Wrapper>
  )
}

export default UnderPopModal

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
  margin-top: 2rem;
  justify-content: center;
`
