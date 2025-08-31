import { mockTMDBData } from "./mockData.js"
import type { MovieLists } from "./moviesType.js"

const getOptions = () => {
  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  }
}

export const getMovies = async (category: MovieLists) => {
  return mockTMDBData // TODO: remove mock data
  const page = 1

  const response = await fetch(
    `${process.env.TMDB_API_BASE_URL}movie/${category}?language=en-US&page=${page}`,
    getOptions()
  )
  const data = await response.json()
  return data
}

export const getMovie = async (movieId: number) => {
  return mockTMDBData.results.find((movie) => movie.id === movieId) // TODO: remove mock data
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    getOptions()
  )
  const data = await response.json()
  return data
}
