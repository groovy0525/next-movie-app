import { BiError } from "react-icons/bi";
import styled from "styled-components";

function NotFound() {
  return (
    <NoutFoundBlock>
      <BiError />
      페이지를 찾을 수 없습니다.
    </NoutFoundBlock>
  );
}

export default NotFound;

const NoutFoundBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  font-size: 24px;

  > svg {
    margin-right: 10px;
    color: red;
    font-size: 30px;
  }
`;
