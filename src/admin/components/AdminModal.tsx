import {ReactNode, useEffect, useState} from "react";
import DefaultButton from "./DefaultButton";
import styled from "styled-components";
import {useLockBodyScroll} from "../hooks";

interface ModalProps {
  title: string,
  show: boolean,
  onHide?: () => void,
  onSubmit?: () => void,
  buttons?: ReactNode[]
  children?: ReactNode,
}

export const AdminModal = ({title, show, buttons, onHide, onSubmit, children}: ModalProps) => {

  const [_show, _setShow] = useState(show)

  useEffect(() => {
    _setShow(show)
  }, [show])

  const _hide = () => {
    _setShow(false)
    onHide ? onHide() : null
  }

  const _submit = () => {
    onSubmit ? onSubmit() : null
    _hide()
  }

  const ModalOpened = () => {
    useLockBodyScroll()

    return (
      <ModalBackground>
        <ModalWrapper>
          <ModalHeader>
            <TitleText>{title}</TitleText>
          </ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            {buttons ? buttons :
              <>
                <DefaultButton text={'취소하기'} backgroundColor={'rgb(199, 84, 80)'} onClick={_hide}/>
                <DefaultButton text={'등록하기'} backgroundColor={'rgb(73, 156, 84)'} onClick={_submit}/>
              </>}
          </ModalFooter>
        </ModalWrapper>
      </ModalBackground>
    )
  }

  return <>{_show ? <ModalOpened/> : null}</>
}

const ModalBackground = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 10;
`

const ModalWrapper = styled.div`
  background: white;
  width: 50vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  transform: translate(-50%, -50%);
`

const ModalHeader = styled.div`
  height: fit-content;
  width: auto;
  background: rgb(60, 63, 65);
  display: flex;
  align-items: center;
  padding: 16px;
`
const TitleText = styled.div`
  font-size: x-large;
  font-weight: bold;
  color: white;
`

const ModalBody = styled.div`
  min-height: 16vh;
  padding: 16px;
`

const ModalFooter = styled.div`
  height: fit-content;
  width: auto;
  background: rgb(60, 63, 65);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
`