import styled from "styled-components";
import {ReactElement, useEffect} from "react";


interface Props {
  active: boolean
  onClose: () => void
  children?: ReactElement[] | ReactElement
}

export const PopupBackground = ({active, onClose, children}: Props): ReactElement => {

  useEffect(() => {
    if (active) {
      disableScroll()
    } else {
      activeScroll()
    }
  }, [active])

  const disableScroll = () => {
    const offsetY = window.pageYOffset
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
    document.body.style.top = `${-offsetY}px`
    document.ontouchmove = function (e) {
      e.preventDefault();
    }
  }

  const activeScroll = () => {
    const offsetY = Math.abs(parseInt(document.body.style.top || '0', 10))
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    window.scrollTo({top: offsetY || 0})
    document.ontouchmove = function () {
      return true;
    }
  }

  return (
    <Background display={active ? undefined : 'none'} onClick={onClose}>
      <Children display={active ? undefined : 'none'} onClick={(e) => e.stopPropagation()}>{children}</Children>
    </Background>
  )
}

interface BackgroundProps {
  display?: string
}

const Background = styled.div<BackgroundProps>`
  width: 100%;
  max-width: 36rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  display: ${props => props.display};
  z-index: 100;
`

const Children = styled.div<BackgroundProps>`
  display: ${props => props.display};
`