import { useCallback, useEffect, useState } from "react";

function useMovieImage(newImage: string) {
  const [image, setImage] = useState(newImage);

  useEffect(() => {
    setImage(newImage);
  }, [newImage]);

  const handleImageError = useCallback(() => {
    setImage("placeholder_for_missing_posters.png");
  }, []);

  return { handleImageError, image };
}

export default useMovieImage;
