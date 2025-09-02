import { Link } from "react-router-dom"
import type { Movie } from "../../../backend/moviesType"
import { IMG_backdrop_sizes, IMG_base_url } from "../../utils/constants"

import "./MovieCard.scss"

interface MovieCardProps {
  movie: Movie
  category: string
}

const MovieCard = ({ movie, category }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${category}/${movie.id}`}>
        <img
          src={`${IMG_base_url}${IMG_backdrop_sizes[0]}${movie.poster_path}`}
          alt={movie.title}
        />
        <h3 className="movie-card__title">{movie.title}</h3>
      </Link>
    </div>
  )
}

export default MovieCard
