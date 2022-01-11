import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getImagePath } from "../lib/getImage";
import { getMovie, getMovieActors } from "../pages/api/movies";
import { ActorType, MovieDetail } from "../types";
import Banner from "./Banner";
import GridLayout from "./GridLayout";
import Seo from "./Seo";

function Detail() {
  const id = useRouter().query.id as string;

  const [basic, setBasic] = useState(true);

  const handleBasic = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.innerText === "Info";
    setBasic(value);
  };

  const { isLoading: isMovieLoading, data: movie } = useQuery<MovieDetail>(
    ["movie detail", id],
    () => getMovie(id),
    { enabled: Boolean(id) }
  );

  const { isLoading: isActorLoading, data: actors } = useQuery<ActorType[]>(
    ["movie actors", id],
    () => getMovieActors(id).then(credits => credits.cast),
    { enabled: Boolean(id) }
  );

  if (isMovieLoading || !movie) return <p>Loading...</p>;

  return (
    <>
      <Seo title={movie.title || "Loading.."} />
      <DetailBlock>
        <Banner
          imgPath={getImagePath(movie.backdrop_path)}
          title={movie.title}
          overview={movie.overview}
        />
        <Buttons>
          <Button onClick={handleBasic}>Info</Button>
          <Button onClick={handleBasic}>Actors</Button>
        </Buttons>
        {basic ? (
          <InfoBlock>
            <Title>Movie Info</Title>
            <InfoWrapper>
              <InfoName>release_date</InfoName>
              <Info>{movie.release_date}</Info>
              <InfoName>genre</InfoName>
              <Info>
                {movie.genres.map(genre => `${genre.name}`).join(", ")}
              </Info>
              <InfoName>runtime</InfoName>
              <Info>{movie.runtime}</Info>
              <InfoName>vote_average</InfoName>
              <Info>{movie.vote_average}</Info>
              <InfoName>status</InfoName>
              <Info>{movie.status}</Info>
            </InfoWrapper>
          </InfoBlock>
        ) : (
          <GridLayout>
            {(!actors || isActorLoading) && <p>Loading...</p>}
            {actors?.map((actor: ActorType) => (
              <Card key={actor.id}>
                <Image
                  src={
                    actor.profile_path
                      ? getImagePath(actor.profile_path, "w200")
                      : "NOT_FOUND"
                  }
                  alt={`${actor.name} 이미지`}
                />
                <h5>{actor.name}</h5>
                <p>{actor.character}</p>
              </Card>
            ))}
          </GridLayout>
        )}
      </DetailBlock>
    </>
  );
}

export default Detail;

const DetailBlock = styled.div`
  position: relative;
`;

const InfoBlock = styled.div`
  margin-top: 30px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  font-size: 20px;
  width: 48%;
  height: 60px;
  border-bottom: 1px solid #dee5e2;
`;

const Title = styled.h4`
  margin-bottom: 20px;
  padding-left: 100px;
  font-size: 24px;
  font-weight: 600;
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  row-gap: 10px;
  position: relative;
  margin-left: 100px;
  margin-bottom: 30px;
  padding-left: 20px;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #dee5e2;
  }
`;

const InfoName = styled.h5`
  color: #808080;
  line-height: 1.2;
`;

const Info = styled.h5`
  overflow: hidden;
  color: #424242;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.2;
`;

const Card = styled.li`
  text-align: center;
  > h5 {
    font-size: 24px;
  }

  > p {
    font-size: 18px;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 320px;
`;
