import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
/*@ts-ignore*/
import "swiper/css"
/*@ts-ignore*/
import "swiper/css/navigation"

import BaseLayout from "../../layout/BaseLayout"
import type { Movie, MovieListsByCategory } from "../../../backend/moviesType"

import { IMG_base_url, IMG_backdrop_sizes } from "../../utils/constants"

import "./Home.scss"

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
                <div className="swiper-container">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                      600: {
                        slidesPerView: 3,
                      },
                      800: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {movieList.results.map((movie: Movie) => (
                      <SwiperSlide
                        key={movie.id}
                        className="swiper-container__slide"
                      >
                        <Link to={`/movie/${movieList.category}/${movie.id}`}>
                          <img
                            src={`${IMG_base_url}${IMG_backdrop_sizes[0]}${movie.poster_path}`}
                            alt={movie.title}
                          />
                          <h3 className="swiper-container__slide-title">
                            {movie.title}
                          </h3>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )
          })}
        </>
      )}
    </BaseLayout>
  )
}

export default Home
