import { useEffect, useState } from "react"
/*@ts-ignore*/
import "swiper/css"
/*@ts-ignore*/
import "swiper/css/navigation"

import Carousel from "../../components/carousel/Carousel"
import BaseLayout from "../../layout/BaseLayout"
import type { MovieListsByCategory } from "../../backend/moviesType"

import "./Home.scss"
import MovieCard from "../../components/movieCard/MovieCard"
import { useAppContext } from "../../store/app/hooks"

const Home = () => {
  const {
    appState: {
      views: { home: homeData },
    },
    setAppState,
  } = useAppContext()
  const [isLoading, setIsLoading] = useState(Boolean(!homeData))
  const [isError, setIsError] = useState(false)
  const [movies, setMovies] = useState<MovieListsByCategory[]>(
    homeData ? homeData : []
  )

  useEffect(() => {
    if (homeData)
      return () => {
        setAppState((prev) => {
          return { ...prev, views: { ...prev.views, home: undefined } }
        })
      }

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
  }, [homeData])

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
