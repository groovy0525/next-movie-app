import React from "react";
import Link from "next/link";
import styled from "styled-components";

interface CardProps {
  id: number;
  title: string;
  src: string;
}

function Card({ id, title, src }: CardProps) {
  return (
    <CardBlock>
      <Link href={`/movie/${id}`}>
        <a>
          <Image src={src} alt={`${title} 포스터 이미지`} />
        </a>
      </Link>
    </CardBlock>
  );
}

export default React.memo(Card);

const CardBlock = styled.li``;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 320px;
`;
