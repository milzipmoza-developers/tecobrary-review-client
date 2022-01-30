import {ArrowBackButton} from "../buttons/ArrowBackButton";
import React, {ReactElement} from "react";
import styled from "styled-components";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {loginModalState} from "../../states/LoginModal";
import {userState} from "../../states/User";
import {PersonCircle} from "react-ionicons";
import {useHistory} from "react-router-dom";

interface Props {
  useBackButton?: boolean
  useProfileButton?: boolean
}

export const TransparentHeader = ({useBackButton, useProfileButton}: Props): ReactElement => {

  const history = useHistory()
  const user = useRecoilValue(userState)
  const setLoginModal = useSetRecoilState(loginModalState)

  const openModal = () => {
    setLoginModal({open: true})
  }

  return (
    <HeaderWrapper>
      <Header>
        {useBackButton ? <ArrowBackButton/> : null}
        {useProfileButton ? <AvatarWrapper>
          {user.loggedIn ?
            <AvatarImageButton src={user.userInfo?.profileImageUrl} onClick={() => history.push("/my-page")}/>
            : <AvatarLoginButton onClick={openModal}>
              <PersonCircle width={'2rem'} height={'2rem'} color={'#7f8c8d'}/>
            </AvatarLoginButton>}
        </AvatarWrapper> : null}
      </Header>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  max-width: 36rem;
  top: 2rem;
  z-index: 100;
  display: flex;
`

const Header = styled.div`
  margin: 0 2rem 0 2rem;
  //background: pink;
  width: 100%;
  display: flex;
  flex-direction: row;
`

const AvatarWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
  right: 0;
  border-radius: 50%;
  margin-left: auto;
  align-self: flex-end;
`

const AvatarLoginButton = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgb(39, 54, 70);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`

const AvatarImageButton = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`
