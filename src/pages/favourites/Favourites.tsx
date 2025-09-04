import BaseLayout from "../../layout/BaseLayout"
import { useFavourites } from "../../hooks/useFavourites"
import MovieCard from "../../components/movieCard/MovieCard"

import "./Favourites.scss"

const Favourites = () => {
  const { favourites } = useFavourites()

  return (
    <BaseLayout>
      <h2>Your Favourite Movies</h2>
      {favourites.length > 0 ? (
        <ul className="favourites-list">
          {favourites.map((movie) => (
            <li>
              <MovieCard movie={movie} category={movie.category} />
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favourite movies yet.</p>
      )}
    </BaseLayout>
  )
}

export default Favourites
