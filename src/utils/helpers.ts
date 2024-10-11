export function isCompleted(page: ApiData) {
  const totalPages = Math.ceil(
    parseInt(page["total-content-items"]) /
      parseInt(page["page-size-requested"]),
  );
  const currentPage = parseInt(page["page-num-requested"]);
  return totalPages === currentPage;
}

export const isValidMovie = (movie: MovieItem, regex: RegExp) =>
  regex.test(movie.name);

export function isScrollEndReached(container: HTMLDivElement | null) {
  if (!container) {
    return false;
  }
  const scrollPosition =
    (container?.scrollTop || 0) + (container?.clientHeight || 0);
  const scrollHeight = container?.scrollHeight || 0;

  return scrollPosition >= scrollHeight;
}
