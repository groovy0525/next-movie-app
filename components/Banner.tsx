import styled from "styled-components";

interface BannerProps {
  imgPath: string;
  title: string;
  overview: string;
}

function Banner({ imgPath, title, overview }: BannerProps) {
  return (
    <BannerBlock imagePath={imgPath}>
      <Summary>
        <Title>{title}</Title>
        <Description>{overview}</Description>
      </Summary>
    </BannerBlock>
  );
}

export default Banner;

const BannerBlock = styled.section<{ imagePath?: string }>`
  position: relative;
  min-height: 700px;
  background-image: linear-gradient(
      to top right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.2)
    ),
    url(${({ imagePath }) => imagePath});
  background-position: top;
  background-size: cover;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 30px;
  bottom: 50px;
  color: #fff;
`;

const Title = styled.h2`
  font-size: 36px;
`;

const Description = styled.p`
  display: -webkit-box;
  width: 40%;
  margin-top: 20px;
  font-size: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
`;
