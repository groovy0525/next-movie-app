import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import Banner from "../components/Banner";
import Card from "../components/Card";
import GridLayout from "../components/GridLayout";
import Seo from "../components/Seo";
import { getImagePath } from "../lib/getImage";
import { MovieType } from "../types";
import { getTopRatedMovies } from "./api/movies";

const random: number = Math.floor(Math.random() * 5);

function TopRated() {
  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["top_rated"],
    async ({ pageParam = 1 }) => await getTopRatedMovies(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const onScroll = async () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const { scrollTop } = document.documentElement;

      if (!fetching && scrollTop + innerHeight >= scrollHeight) {
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
      <Seo title="Movie App | TopRated" />
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

export default TopRated;
