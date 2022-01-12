import styled from "styled-components";

const FullScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 36rem;
  z-index: 0;
`

export default FullScreen