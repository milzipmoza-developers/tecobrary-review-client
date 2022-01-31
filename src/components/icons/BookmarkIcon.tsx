import {ReactElement} from "react";
import {Bookmark, BookmarkOutline} from "react-ionicons";

interface Props {
  color?: string
  marked: boolean
  size?: string
  onClick?: () => void
}

export const BookmarkIcon = ({color, marked, size, onClick}: Props): ReactElement => {

  return (
    <div onClick={onClick}>
      {marked
        ? <Bookmark color={color ? color : "#34495e"} width={size ? size : "1.5rem"} height={size ? size : "1.5rem"}/>
        : <BookmarkOutline color={color ? color : "#34495e"} width={size ? size : "1.5rem"}
                           height={size ? size : "1.5rem"}/>}
    </div>
  )
}