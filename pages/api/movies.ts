import axios from "axios";

export const getPopularMovies = async (page: number = 1) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
  );
  return response.data;
};

export const getTopRatedMovies = async (page: number = 1) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
  );
  return response.data;
};

export const getUpcomingMovies = async (page: number = 1) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
  );
  return response.data;
};

export const getNowPlayingMovies = async (page: number = 1) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
  );
  return response.data;
};

export const getMovie = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return response.data;
};

export const getMovieActors = async (id: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return response.data;
};
