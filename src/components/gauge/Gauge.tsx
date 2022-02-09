import styled from "styled-components";
import {ReactElement, useEffect, useRef, useState} from "react";

interface Props {
  name: string
  total: number
  count: number
  color: string
}

export const Gauge = (props: Props): ReactElement => {
  const {name, total, count, color} = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const _percent = Math.round((count / total) * 100)
    setPercent(_percent)
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      <Filler width={percent} color={color}>
        <Name content={name} width={`${wrapperRef.current?.offsetWidth ?? 0}px`}/>
      </Filler>
      <Count content={`${percent}%`}/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: auto;
  height: 2rem;
  border: 1px solid rgb(233, 238, 239);
  border-radius: 10px;
  position: relative;
`

interface FillerProps {
  width: number
  color: string
}

const Filler = styled.div<FillerProps>`
  height: 100%;
  border-radius: inherit;
  background-color: ${props => props.color};
  width: ${props => props.width}%;
  position: absolute;
`

interface ContentProps {
  content: string
  width: string
}

const Name = styled.div<ContentProps>`
  color: rgb(39, 54, 70);
  width: ${props => props.width};
  align-items: center;
  position: absolute;
  left: 5px;

  &:after {
    content: "${props => props.content}";
    color: rgb(255, 255, 255);
    mix-blend-mode: difference;
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    line-height: 2rem;
    padding-left: 10px;
  }
`

interface CountProps {
  content: string
}

const Count = styled.div<CountProps>`
  height: 100%;
  position: absolute;
  right: 20px;

  &:after {
    content: "${props => props.content}";
    color: rgb(255, 255, 255);
    mix-blend-mode: difference;
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    line-height: 2rem;
    padding-left: 10px;
  }
`