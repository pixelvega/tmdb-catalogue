import { useEffect, useState } from "react"

import BaseLayout from "../../layout/BaseLayout"
import type { Movie, ResponseMovies } from "../../../backend/moviesType"
import { Link } from "react-router-dom"

const Home = ({ initialData }: { initialData?: ResponseMovies }) => {
  const [isLoading, setIsLoading] = useState(Boolean(!initialData))
  const [isError, setIsError] = useState(false)
  const [movies, setMovies] = useState<Movie[]>(
    initialData ? initialData.results : []
  )

  useEffect(() => {
    if (initialData) return

    setIsError(false)
    fetch("/api/movies")
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setMovies(data.results)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log("error", err)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [initialData])

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <BaseLayout>
      <h2>Hello world</h2>
      {isError ? (
        <p>Error</p>
      ) : (
        <ul>
          {movies.map((movie: Movie) => {
            return (
              <li key={movie.id}>
                <Link to={`/movie/popular/${movie.id}`}>{movie.title}</Link>
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Link to={`/movie/popular/asf`}>Movie</Link>
      </div>
    </BaseLayout>
  )
}

export default Home
