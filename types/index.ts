export interface GenreType {
  id: number;
  name: string;
}

export interface MovieType {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  status: string;
  genres: GenreType[];
  vote_average: number;
}

export interface ActorType {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface CreditsType {
  id: number;
  cast: ActorType[];
}
