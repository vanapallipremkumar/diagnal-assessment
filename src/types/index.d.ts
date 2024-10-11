interface MovieItem {
  name: string;
  "poster-image": string;
}

interface ApiData {
  "content-items": { content: MovieItem[] };
  "page-num-requested": string;
  "page-size-requested": string;
  "page-size-returned": string;
  title: string;
  "total-content-items": string;
}

interface MovieCardProps {
  movie: MovieItem;
}

interface HeaderProps {
  query: string;
  onChangeQuery(event: any): void;
  title: string;
}
