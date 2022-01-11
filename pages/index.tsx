import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import Banner from "../components/Banner";
import Card from "../components/Card";
import GridLayout from "../components/GridLayout";
import Seo from "../components/Seo";
import { getImagePath } from "../lib/getImage";
import { MovieType } from "../types";
import { getPopularMovies } from "./api/movies";

const random: number = Math.floor(Math.random() * 5);

function Home() {
  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["popular"],
    async ({ pageParam = 1 }) => await getPopularMovies(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        const MAX_PAGE = 500;
        const nextPage = pages.length + 1;
        return nextPage <= MAX_PAGE ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const { scrollTop } = document.documentElement;

      if (!fetching && scrollTop + innerHeight >= scrollHeight - 60) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <Seo title="Movie App | Popular" />
      {isLoading || !data ? (
        <p>Loading...</p>
      ) : (
        <>
          <Banner
            title={data.pages[0].results[random].title}
            overview={data.pages[0].results[random].overview}
            imgPath={getImagePath(data.pages[0].results[random].backdrop_path)}
          />
          <GridLayout>
            {data?.pages.map(page =>
              page.results.map((movie: MovieType, index: number) => (
                <Card
                  key={index}
                  id={movie.id}
                  title={movie.title}
                  src={getImagePath(movie.poster_path, "w500")}
                />
              ))
            )}
          </GridLayout>
        </>
      )}
    </>
  );
}

export default Home;
