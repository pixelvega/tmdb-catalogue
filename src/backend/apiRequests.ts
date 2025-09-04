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

export const getMoviesByCategory = async (category: MovieLists) => {
  const page = 1

  const response = await fetch(
    `${process.env.TMDB_API_BASE_URL}movie/${category}?language=en-US&page=${page}`,
    getOptions()
  )
  const data = await response.json()
  return data
}

export const getMovieListsByCategory = async (categories: MovieLists[]) => {
  const promises = categories.map((category) =>
    getMoviesByCategory(category as MovieLists)
  )
  const dataAll = await Promise.allSettled(promises)
  return dataAll
    .map((promise, index) => {
      if (promise.status === "fulfilled" && promise.value.results) {
        return { ...promise.value, category: categories[index] }
      }
      return undefined
    })
    .filter((item) => item !== undefined)
}

export const getMovieById = async (movieId: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    getOptions()
  )
  const data = await response.json()
  return data
}
