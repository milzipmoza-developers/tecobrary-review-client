import styled from "styled-components";

interface Props {
  marginBottom?: string
  marginTop?: string
}

export const PageContent = styled.div<Props>`
  width: auto;
  height: fit-content;
  margin-bottom: ${props => props.marginBottom ?? undefined};
  margin-top: ${props => props.marginTop ?? undefined};
`