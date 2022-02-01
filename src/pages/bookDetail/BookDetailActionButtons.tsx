import {LikeIcon} from "../../components/icons/LikeIcon";
import {BookmarkIcon} from "../../components/icons/BookmarkIcon";
import styled from "styled-components";
import React, {ReactElement, useState} from "react";
import {CountActionButton} from "../../components/buttons/CountActionButton";
import {MarkApi} from "../../api/mark/mark.service";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userState} from "../../states/User";
import {NETWORK_ERROR_DEFAULT, popState} from "../../states/Pop";

interface Props {
  isbn: string
  like: boolean
  likeCounts: number
  favorite: boolean
  favoriteCounts: number
  color?: string
}

export const BookDetailActionButtons = (props: Props): ReactElement => {

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
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: "로그인하고 좋아요 목록에 추가하실래요?", open: true, duration: 3000, color: "WARN"})
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
      if (e.response && (400 <= e.response.status && e.response.status < 500)) {
        setPop({message: "로그인하고 북마크 목록에 추가하실래요?", open: true, duration: 3000, color: "WARN"})
        return
      }

      if (e.response && (500 <= e.response.status && e.response.status < 600)) {
        setPop({message: e.response.data.message, open: true, duration: 3000, color: "WARN"})
        return
      }
      setPop(NETWORK_ERROR_DEFAULT)
    }
  }

  return (
    <ActionButtonWrapper>
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