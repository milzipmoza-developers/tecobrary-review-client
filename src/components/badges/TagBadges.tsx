import {ReactElement} from "react";
import {CategoryBadge} from "./CategoryBadge";
import styled from "styled-components";
import {Tag} from "../../interfaces";

interface Props {
  size?: 'small' | 'medium'
  maxLength?: number
  bold?: boolean
  tags: Tag[]
}

export const TagBadges = ({size, maxLength, bold, tags}: Props): ReactElement => (
  <Wrapper>
    {tags.map((it: Tag, index: number) => {
      if (maxLength && index > maxLength - 1) return null
      return (<CategoryBadge key={index}
                             backgroundColor={it.colorCode}
                             size={size}
                             fontWeight={bold ? 'bold' : undefined}>{it.name}</CategoryBadge>)
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  width: auto;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0.5rem 0 0.5rem 0;
`