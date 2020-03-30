export type TraktIds = {
  trakt: number;
  slug: string;
  tbdb: number;
  imdb: number;
  tmdb: number;
  tvrage: number;
};

export type TraktShow = {
  title: string;
  year: number;
  ids: TraktIds;
};

export type TraktExtended = { rating: number } & TraktShow;

export type ShowStats = {
  watcher_count?: number;
  watchers?: number;
  play_count?: number;
  collected_count?: number;
  collector_count?: number;
};

export type TraktShowWithStats = {
  show: TraktShow;
} & ShowStats;

export type Episode = {};
