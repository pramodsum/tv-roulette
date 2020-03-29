export type TraktShow = {
  title: string;
  year: number;
  ids: {
    trakt: number;
    slug: string;
    tbdb: number;
    imdb: number;
    tmdb: number;
    tvrage: number;
  };
};

export type TraktShowWithStats = {
  watcher_count?: number;
  watchers?: number;
  play_count?: number;
  collected_count?: number;
  collector_count?: number;
  show: TraktShow;
};

export type Episode = {};
