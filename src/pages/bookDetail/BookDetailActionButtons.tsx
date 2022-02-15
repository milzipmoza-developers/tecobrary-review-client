import {LikeIcon} from "../../components/icons/LikeIcon";
import {BookmarkIcon} from "../../components/icons/BookmarkIcon";
import styled from "styled-components";
import React, {createRef, ReactElement, useEffect, useRef, useState} from "react";
import {CountActionButton} from "../../components/buttons/CountActionButton";
import {MarkApi} from "../../api/mark/mark.service";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../states/User";
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";
import {loginModalState} from "../../states/LoginModal";
import {Share, ShareOutline} from "react-ionicons";
import ReactTooltip from "react-tooltip";

interface Props {
  isbn: string
  title: string
  like: boolean
  likeCounts: number
  favorite: boolean
  favoriteCounts: number
  color?: string
}

export const BookDetailActionButtons = (props: Props): ReactElement => {

  const setLoginModal = useSetRecoilState(loginModalState)
  const user = useRecoilValue(userState)
  const setPop = useSetRecoilState(popState)

  const [likeMark, setLikeMark] = useState({
    marked: props.like,
    count: props.likeCounts
  })

  const [favoriteMark, setFavoriteMark] = useState({
    marked: props.favorite,
    count: props.favoriteCounts
  })

  const onClickLike = async () => {
    try {
      if (likeMark.marked) {
        const result = await MarkApi.unmark(user.deviceId, user.token, props.isbn, "like")
        if (result) {
          setLikeMark({
            count: likeMark.count - 1,
            marked: false,
          })
        }
      } else {
        const result = await MarkApi.mark(user.deviceId, user.token, props.isbn, "like")
        if (result) {
          setLikeMark({
            count: likeMark.count + 1,
            marked: true,
          })
        }
      }
    } catch (e) {
      if (e.response && e.response.status == 401) {
        setLoginModal({open: true, message: "로그인하면 북마크 목록에 추가할 수 있어요"})
        return
      }

      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: `${e.response.data.message}`, open: true, duration: 3000, color: "WARN"})
        return
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
        return
      }
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const onClickFavorite = async () => {
    try {
      if (favoriteMark.marked) {
        const result = await MarkApi.unmark(user.deviceId, user.token, props.isbn, "favorite")
        if (result) {
          setFavoriteMark({
            count: favoriteMark.count - 1,
            marked: false,
          })
        }
      } else {
        const result = await MarkApi.mark(user.deviceId, user.token, props.isbn, "favorite")
        if (result) {
          setFavoriteMark({
            count: favoriteMark.count + 1,
            marked: true,
          })
        }
      }
    } catch (e) {
      if (e.response && e.response.status == 401) {
        setLoginModal({open: true, message: "로그인하면 북마크 목록에 추가할 수 있어요"})
        return
      }

      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: `${e.response.data.message}`, open: true, duration: 3000, color: "WARN"})
        return
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
        return
      }
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  const onClickShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '새로운 기술 도서 & 핫한 기술 도서를 모아볼 수 있는 테코브러리',
          url: document.location.href,
          text: `${props.title} 리뷰 확인하고 읽어보는거 어때요 ?`
        })
        setPop({message: `책을 공유했어요 !`, open: true, duration: 2000, color: "INFO"})
      } catch (e) {
        console.log('공유하기 취소')
      }
      return
    }
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`[테코브러리] ${props.title} 리뷰 확인하고 읽어보는거 어때요 ?\n\n${document.location.href}`)
        setPop({message: `클립보드에 복사되었어요 !`, open: true, duration: 2000, color: "INFO"})
      } catch (e) {
        console.log('클립보드 오류')
      }
      return
    }
  }

  return (
    <ActionButtonWrapper>
      <div style={{cursor: "pointer"}} onClick={onClickShare}>
        <ShareOutline color={"#34495e"} width={"1.5rem"} height={"1.5rem"}/>
      </div>
      <Space/>
      <CountActionButton counts={likeMark.count} color={props.color ? props.color : "black"}>
        <LikeIcon like={likeMark.marked} color={props.color ? props.color : "#FF758F"}
                  onClick={onClickLike}/>
      </CountActionButton>
      <Space/>
      <CountActionButton counts={favoriteMark.count} color={props.color ? props.color : "black"}>
        <BookmarkIcon marked={favoriteMark.marked} color={props.color ? props.color : "#FFB700"}
                      onClick={onClickFavorite}/>
      </CountActionButton>
    </ActionButtonWrapper>
  )
}

const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-self: baseline;
  align-items: center;
`

const Space = styled.div`
  width: 1rem;
`