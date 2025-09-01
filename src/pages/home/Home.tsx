import { useEffect, useState } from "react"

/*@ts-ignore*/
import "swiper/css"
/*@ts-ignore*/
import "swiper/css/navigation"

import BaseLayout from "../../layout/BaseLayout"
import type { Movie, ResponseMovies } from "../../../backend/moviesType"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import { IMG_base_url, IMG_backdrop_sizes } from "../../utils/constants"

import "./Home.scss"

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
      {isError ? (
        <p>Error</p>
      ) : (
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
            {movies.map((movie: Movie) => (
              <SwiperSlide key={movie.id} className="swiper-container__slide">
                <Link to={`/movie/popular/${movie.id}`}>
                  <img
                    src={`${IMG_base_url}${IMG_backdrop_sizes[0]}${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h2 className="swiper-container__slide-title">
                    {movie.title}
                  </h2>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </BaseLayout>
  )
}

export default Home
