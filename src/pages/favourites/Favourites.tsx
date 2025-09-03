import BaseLayout from "../../layout/BaseLayout"
import { useFavourites } from "../../hooks/useFavourites"
import MovieCard from "../../components/movieCard/MovieCard"

import "./Favourites.scss"

const Favourites = () => {
  const { favourites } = useFavourites()

  return (
    <BaseLayout>
      <h2>Your Favourite Movies</h2>
      <ul className="favourites-list">
        {favourites.map((movie) => (
          <li>
            <MovieCard movie={movie} category={movie.category} />
          </li>
        ))}
      </ul>
    </BaseLayout>
  )
}

export default Favourites
