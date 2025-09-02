import type { Movie, MovieListsByCategory } from "../../backend/moviesType"

export interface InitialState {
  details: Details | undefined
  genres: Genre[] | undefined
  views: Views
}

export interface Views {
  home: MovieListsByCategory[] | undefined
  detail: Movie | undefined
}

export interface Genre {
  id: number
  name: string
}

export interface Details {
  images: Images
  change_keys: string[]
}

export interface Images {
  base_url: string
  secure_base_url: string
  backdrop_sizes: string[]
  logo_sizes: string[]
  poster_sizes: string[]
  profile_sizes: string[]
  still_sizes: string[]
}
