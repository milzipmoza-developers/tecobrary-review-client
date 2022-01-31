import {ReactElement} from "react";
import {Heart, HeartOutline} from "react-ionicons";

interface Props {
  color?: string
  like: boolean
  size?: string
  onClick?: () => void
}

export const LikeIcon = ({color, like, size, onClick}: Props): ReactElement => {

  return (
    <div onClick={onClick}>
      {like
        ? <Heart color={color ? color : "#34495e"} width={size ? size : "1.5rem"} height={size ? size : "1.5rem"}/>
        : <HeartOutline color={color ? color : "#34495e"} width={size ? size : "1.5rem"}
                        height={size ? size : "1.5rem"}/>}
    </div>
  )
}