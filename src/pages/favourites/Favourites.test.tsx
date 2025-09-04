import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { vi, describe, test, expect } from "vitest"

import Favourites from "./Favourites"

import * as useFavouritesHook from "../../hooks/useFavourites"
import { mockFavourites } from "../../tests/mocks/mockData"

vi.mock("../../hooks/useFavourites", () => ({
  useFavourites: vi.fn(),
}))

describe("Favourites Page", () => {
  test("renders a list of favourite movies", () => {
    const useFavouritesMock = useFavouritesHook.useFavourites as jest.Mock
    useFavouritesMock.mockReturnValue({
      favourites: mockFavourites,
      toggleFavourite: vi.fn(),
      isFavourite: vi.fn(),
    })

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    )

    expect(screen.getByText("Your Favourite Movies")).toBeInTheDocument()
    for (const movie of mockFavourites) {
      expect(screen.getByText(movie.title)).toBeInTheDocument()
    }
  })

  test("renders no favourites message if list is empty", () => {
    // @ts-ignore
    useFavouritesHook.useFavourites.mockReturnValue({
      favourites: [],
    })

    render(
      <MemoryRouter>
        <Favourites />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/you have no favourite movies yet/i)
    ).toBeInTheDocument()
  })
})
