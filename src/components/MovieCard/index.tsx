import { memo } from "react";
import useMovieImage from "../../hooks/useMovieImage";
import "./index.css";

function MovieCard({ movie }: MovieCardProps) {
  const { handleImageError, image } = useMovieImage(movie["poster-image"]);

  return (
    <li className="movie-list-item">
      <img
        alt={movie.name}
        className="movie-item-image"
        onError={handleImageError}
        src={`https://test.create.diagnal.com/images/${image}`}
      />
      <p className="movie-item-name">{movie.name}</p>
    </li>
  );
}

export default memo(MovieCard);
