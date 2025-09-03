import { useEffect, useLayoutEffect } from "react"
import { Link, useParams } from "react-router-dom"

import type { MovieLists } from "../../backend/moviesType"
import BaseLayout from "../../layout/BaseLayout"
import { Button } from "../../components/button/Button"

import { IMG_backdrop_sizes, IMG_base_url } from "../../constants/api"
import { useAppContext } from "../../store/app/hooks"
import useGetMovieDetail from "../../hooks/useGetMovieDetail"
import { useFavourites } from "../../hooks/useFavourites"

import "./Detail.scss"

const Detail = () => {
  const {
    appState: {
      views: { detail: detailData },
    },
    setAppState,
  } = useAppContext()

  const params = useParams<{ movieId: string; category: MovieLists }>()
  const { isFavourite, toggleFavourite } = useFavourites()

  const { isLoading, isError, movie, getMovieDetail } = useGetMovieDetail(
    detailData,
    params.movieId
  )

  useLayoutEffect(() => {
    params.category &&
      document.body.setAttribute("data-category", params.category)
    return () => {
      document.body.removeAttribute("data-category")
    }
  }, [params.category])

  useEffect(() => {
    if (detailData)
      return () => {
        setAppState((prev) => {
          return { ...prev, views: { ...prev.views, detail: undefined } }
        })
      }
    if (!params.movieId) return
    getMovieDetail()
  }, [detailData, params.movieId])

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    )

  return (
    <BaseLayout>
      {movie && !isError ? (
        <article className="detail">
          <section className="detail-main">
            <div className="detail-main__background">
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={`${IMG_base_url}${IMG_backdrop_sizes[2]}${movie.backdrop_path}`}
                />
                <img
                  src={`${IMG_base_url}${IMG_backdrop_sizes[1]}${movie.poster_path}`}
                  alt={movie.title}
                  className="detail-main__background-image"
                />
              </picture>
            </div>
            <div className="detail-main__info">
              <h1 className="detail-main__title">{movie.title}</h1>
              {/* <p className="detail-main__genres">
                <span>Genres: </span>
                {movie.genre_ids.join(", ")}
              </p> */}
              <p>{movie.overview}</p>
              <p>
                <span>Released: </span>
                {movie.release_date}
              </p>
              <div className="detail-main__buttons">
                <Button
                  variant="solid"
                  size="md"
                  onClick={() =>
                    toggleFavourite({ ...movie, category: params.category! })
                  }
                >
                  {isFavourite(movie.id)
                    ? "Remove from favourite"
                    : "Add to favourite"}
                </Button>
              </div>
            </div>
          </section>
          <section className="detail-extra">
            <h3 className="detail-extra__title">Extra information</h3>
            <p>Popularity: {movie.popularity}</p>
            <p>Votes: {movie.vote_average}</p>
            {/* <p>Genre: {movie.genre_ids.join(", ")}</p> */}
            <p>Released: {movie.release_date}</p>
          </section>
        </article>
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
