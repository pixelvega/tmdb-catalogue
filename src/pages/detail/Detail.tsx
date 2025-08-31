import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import type { Movie } from "../../../backend/moviesType"
import BaseLayout from "../../layout/BaseLayout"

const Detail = ({ initialData }: { initialData?: Movie }) => {
  const [isLoading, setIsLoading] = useState(Boolean(!initialData))
  const [isError, setIsError] = useState(false)
  const [movie, setMovie] = useState<Movie | undefined>(initialData)
  const params = useParams()

  useEffect(() => {
    if (initialData) return
    if (!params.movieId) return
    setIsError(false)
    fetch(`/api/movie/${params.movieId}`)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("data movie fetched", data)
        if (data.success === false) {
          return setIsError(true)
        }
        setMovie(data)
      })
      .catch((err) => {
        console.log("error", err)
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [initialData, params.movieId])

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )

  return (
    <BaseLayout>
      <h1>Detail</h1>
      {movie && !isError ? (
        <>
          <p>{movie.title}</p>
          <p>{JSON.stringify(movie)}</p>
          <p>
            <Link to={"/"}>Back</Link>
          </p>
        </>
      ) : (
        <>
          <h1>Oops!</h1>
          <p>There was an error fetching the movie</p>
          <Link to={"/"}>Go back to the home page</Link>
        </>
      )}
    </BaseLayout>
  )
}

export default Detail
