import {ReactElement} from "react";
import styled from "styled-components";

export const CategoryImageContainer = (imageUrl: string): ReactElement => {
  return (
    <Image src={imageUrl}/>
  )
}

const Image = styled.img``