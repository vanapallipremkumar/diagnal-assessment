import MovieCardShimmer from "../Shimmer";

const shimmerData = Array(12).fill(null);
function LoadingMovies() {
  return shimmerData.map((_, shimmerIndex) => (
    <li key={`shimmer-${shimmerIndex}`}>
      <MovieCardShimmer />
    </li>
  ));
}

export default LoadingMovies;
