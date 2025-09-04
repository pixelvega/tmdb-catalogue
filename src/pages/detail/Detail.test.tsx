import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { vi, describe, test, expect } from "vitest"

import * as useFavouritesHook from "../../hooks/useFavourites"
import { mockFavourites, mockMovieDetail } from "../../tests/mocks/mockData"
import type { InitialState } from "../../store/app/appTypes"
import {
  AppContext,
  type AppContext as AppContextType,
} from "../../store/app/AppContext"
import { initialState } from "../../store/app/initialState"
import Detail from "./Detail"
import { setupMockFetch } from "../../tests/utils/setupMockFetch"

vi.mock("../../hooks/useFavourites", () => ({
  useFavourites: vi.fn(),
}))

function renderWithAppContext(
  children: React.ReactNode,
  appState?: Partial<InitialState>
) {
  const mockContext: AppContextType = {
    appState: {
      ...initialState,
      ...appState,
    },
    setAppState: vi.fn(),
  }

  return render(
    <MemoryRouter
      initialEntries={[
        `/${mockMovieDetail.category}/${mockMovieDetail.results[0].id}`,
      ]}
    >
      <Routes>
        <Route
          path="/:category/:movieId"
          element={
            <AppContext.Provider value={mockContext}>
              {children}
            </AppContext.Provider>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe("Detail page", () => {
  describe("when there is NO data in the context (detailData)", () => {
    test("renders a detail page with the correct data", async () => {
      const useFavouritesMock = useFavouritesHook.useFavourites as jest.Mock
      const toggleFavouriteMock = vi.fn()
      useFavouritesMock.mockReturnValue({
        favourites: mockFavourites,
        toggleFavourite: toggleFavouriteMock,
        isFavourite: vi.fn().mockReturnValue(false),
      })

      setupMockFetch(mockMovieDetail.results[0])

      renderWithAppContext(<Detail />)

      await waitFor(() => {
        expect(
          screen.getByText((content) =>
            content.includes(mockMovieDetail.results[0].title)
          )
        ).toBeInTheDocument()
      })

      await waitFor(() => {
        expect(
          screen.getByText((content) =>
            content.includes(mockMovieDetail.results[0].overview)
          )
        ).toBeInTheDocument()
      })
    })
    test("show correct label 'Add to favourite' when the movie is not in the favourites", async () => {
      const toggleFavouriteMock = vi.fn()
      const isFavouriteMock = vi.fn().mockReturnValue(false)

      ;(useFavouritesHook.useFavourites as jest.Mock).mockReturnValue({
        favourites: mockFavourites,
        toggleFavourite: toggleFavouriteMock,
        isFavourite: isFavouriteMock,
      })

      setupMockFetch(mockMovieDetail.results[0])
      renderWithAppContext(<Detail />)

      const button = await screen.findByRole("button", {
        name: /add to favourite/i,
      })

      expect(button).toBeInTheDocument()

      await userEvent.click(button)

      expect(toggleFavouriteMock).toHaveBeenCalledWith({
        ...mockMovieDetail.results[0],
        category: mockMovieDetail.category,
      })
    })
    test("show correct label 'Remove from favourite' when the movie is in the favourites", async () => {
      const toggleFavouriteMock = vi.fn()
      const isFavouriteMock = vi.fn().mockReturnValue(true)

      ;(useFavouritesHook.useFavourites as jest.Mock).mockReturnValue({
        favourites: mockFavourites,
        toggleFavourite: toggleFavouriteMock,
        isFavourite: isFavouriteMock,
      })

      setupMockFetch(mockMovieDetail.results[0])
      renderWithAppContext(<Detail />)

      const button = await screen.findByRole("button", {
        name: /remove from favourite/i,
      })

      expect(button).toBeInTheDocument()

      await userEvent.click(button)

      expect(toggleFavouriteMock).toHaveBeenCalledWith({
        ...mockMovieDetail.results[0],
        category: mockMovieDetail.category,
      })
    })
  })

  describe("when an error occurs in the fetch", () => {
    test("shows the error message", async () => {
      setupMockFetch({}, 500)
      renderWithAppContext(<Detail />)

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
      })

      const errorText = screen.getByText(
        /there was an error fetching the movie/i
      )
      const link = screen.getByRole("link", {
        name: /go back to the home page/i,
      })

      expect(errorText).toBeInTheDocument()
      expect(link).toBeInTheDocument()
    })
  })
  describe("when it's loading", () => {
    test("shows the 'Loading...' message", () => {
      setupMockFetch({})
      renderWithAppContext(<Detail />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })
  })
})
