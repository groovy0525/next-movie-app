import styled from "styled-components";

const GridLayout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default GridLayout;

const Container = styled.ul`
  display: grid;
  gap: 20px;
  padding: 30px;

  @media (min-width: 577px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 993px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1201px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1401px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (min-width: 1680px) {
    grid-template-columns: repeat(7, 1fr);
  }
`;
