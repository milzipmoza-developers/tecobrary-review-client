import {LikeIcon} from "../../components/icons/LikeIcon";
import {BookmarkIcon} from "../../components/icons/BookmarkIcon";
import styled from "styled-components";
import React, {ReactElement, useState} from "react";
import {CountActionButton} from "../../components/buttons/CountActionButton";
import {MarkApi} from "../../api/mark/mark.service";
import {useRecoilValue} from "recoil";
import {userState} from "../../states/User";

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

  const [likeMark, setLikeMark] = useState({
    marked: props.like,
    count: props.likeCounts
  })

  const [favoriteMark, setFavoriteMark] = useState({
    marked: props.favorite,
    count: props.favoriteCounts
  })

  const onClickLike = async () => {
    if (likeMark.marked) {
      try {
        const result = await MarkApi.unmark(user.deviceId, user.token, props.isbn, "like")
        if (result) {
          setLikeMark({
            count: likeMark.count - 1,
            marked: false,
          })
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const result = await MarkApi.mark(user.deviceId, user.token, props.isbn, "like")
        if (result) {
          setLikeMark({
            count: likeMark.count + 1,
            marked: true,
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const onClickFavorite = async () => {
    if (favoriteMark.marked) {
      try {
        const result = await MarkApi.unmark(user.deviceId, user.token, props.isbn, "favorite")
        if (result) {
          setFavoriteMark({
            count: favoriteMark.count - 1,
            marked: false,
          })
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const result = await MarkApi.mark(user.deviceId, user.token, props.isbn, "favorite")
        if (result) {
          setFavoriteMark({
            count: favoriteMark.count + 1,
            marked: true,
          })
        }
      } catch (e) {
        console.log(e)
      }
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