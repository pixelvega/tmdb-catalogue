import { useEffect, useState } from "react"
/*@ts-ignore*/
import "swiper/css"
/*@ts-ignore*/
import "swiper/css/navigation"

import Carousel from "../../components/carousel/Carousel"
import BaseLayout from "../../layout/BaseLayout"
import type { MovieListsByCategory } from "../../../backend/moviesType"

import "./Home.scss"
import MovieCard from "../../components/movieCard/MovieCard"

const Home = ({ initialData }: { initialData?: MovieListsByCategory[] }) => {
  const [isLoading, setIsLoading] = useState(Boolean(!initialData))
  const [isError, setIsError] = useState(false)
  const [movies, setMovies] = useState<MovieListsByCategory[]>(
    initialData ? initialData : []
  )

  useEffect(() => {
    if (initialData) return

    setIsError(false)
    fetch("/api/movies")
      .then<MovieListsByCategory[]>((response) => {
        return response.json()
      })
      .then((data) => {
        setMovies(data)
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
      {isError ? (
        <p>Error</p>
      ) : (
        <>
          {movies.map((movieList: MovieListsByCategory) => {
            return (
              <div key={movieList.category}>
                <h2 className="category-title">
                  {movieList.category.replace(/_/g, " ")}
                </h2>
                <Carousel
                  items={movieList.results}
                  renderItem={(movie) => (
                    <MovieCard movie={movie} category={movieList.category} />
                  )}
                />
              </div>
            )
          })}
        </>
      )}
    </BaseLayout>
  )
}

export default Home
