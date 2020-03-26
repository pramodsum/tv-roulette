export type Series = {
  original_name: string;
  id: number;
  name: string;
  vote_count: number;
  vote_average: number;
  first_air_date: string;
  poster_path: string;
  genre_ids: number[];
  original_language: string;
  backdrop_path: string;
  overview: string;
  origin_country: string[];
  popularity: number;
  media_type: "tv" | "movie";
};

export type Creator = {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Network = {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export type Episode = {
  air_date: string[];
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export type ProductionCompnay = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type SeriesDetail = {
  backdrop_path: string;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string[];
  last_episode_to_air: Episode;
  name: "Westworld";
  next_episode_to_air: Episode;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompnay[];
  seasons: Season[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
};
