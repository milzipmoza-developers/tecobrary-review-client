import React, {ReactElement} from "react";
import styled from "styled-components";
import {timeForToday} from "../../utils/date";

interface Props {
  time: string
}

export const TimeAGoBadge = ({time}: Props): ReactElement => (
  <Wrapper>{timeForToday(time)}</Wrapper>
)

const Wrapper = styled.div`
  color: rgb(81, 111, 144);
  font-size: small;
`