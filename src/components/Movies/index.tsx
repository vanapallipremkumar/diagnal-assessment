import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useDebounce from "../../hooks/useDebounce";
import useMovies from "../../hooks/useMovies";
import { isScrollEndReached } from "../../utils/helpers";

const MovieCard = lazy(() => import("../MovieCard"));

import Header from "../Header";
import LoadingMovies from "../LoadingMovies";
import NoMovies from "../NoMovies";
import MovieCardShimmer from "../Shimmer";
import "./index.css";

function Movies() {
  const [query, setQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query);
  const { data, fetchNextPage, loading, pagination, title } =
    useMovies(debouncedQuery);

  const onChangeQuery = useCallback((event: any) => {
    setQuery(event.target.value);
  }, []);

  const handleScroll = () => {
    if (loading) return;
    isScrollEndReached(scrollRef.current) && fetchNextPage();
  };

  useEffect(() => {
    if (pagination.completed) {
      scrollRef?.current?.removeEventListener?.("scroll", handleScroll);
    } else {
      scrollRef?.current?.addEventListener?.("scroll", handleScroll);
    }
    return () => {
      scrollRef?.current?.removeEventListener?.("scroll", handleScroll);
    };
  }, [pagination.completed]);

  return (
    <div className="movies-container" ref={scrollRef}>
      <Header onChangeQuery={onChangeQuery} query={query} title={title} />
      {data.length > 0 || loading ? (
        <ul className="movies-list-container" id="movies-list">
          {data.map((movie, movieIndex) => (
            <Suspense
              fallback={<MovieCardShimmer />}
              key={`movie-list-item-${movieIndex}`}
            >
              <MovieCard movie={movie} />
            </Suspense>
          ))}
          {loading && <LoadingMovies />}
        </ul>
      ) : (
        <NoMovies />
      )}
    </div>
  );
}

export default Movies;
