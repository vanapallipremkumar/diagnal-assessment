import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isCompleted, isValidMovie } from "../utils/helpers";

function useMovies(query: string) {
  const [moviesList, setMoviesList] = useState<MovieItem[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    completed: false,
    page: 1,
  });

  function updateData(page: ApiData) {
    setTitle(page.title);
    setMoviesList((prev) => [...prev, ...page["content-items"].content]);
    setPagination((prev) => ({ ...prev, completed: isCompleted(page) }));
  }

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const url = `https://test.create.diagnal.com/data/page${pagination.page}.json`;
      const { data } = await axios(url);
      updateData(data.page);
    } catch (exception) {
    } finally {
      setLoading(false);
    }
  }, [pagination.page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const fetchNextPage = useCallback(() => {
    if (loading || pagination.completed) {
      return;
    }
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [pagination]);

  const queryRegex = useMemo(() => new RegExp(query, "i"), [query]);

  const data = useMemo(
    () => moviesList.filter((movie) => isValidMovie(movie, queryRegex)),
    [queryRegex, moviesList]
  );

  return { data, fetchNextPage, loading, pagination, title };
}

export default useMovies;
