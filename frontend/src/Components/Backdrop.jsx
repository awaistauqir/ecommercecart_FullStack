import styled from "styled-components";

const Backdrop = ({ click }) => {
  return <StyledBackdrop onClick={click}></StyledBackdrop>;
};

export default Backdrop;
const StyledBackdrop = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
`;
