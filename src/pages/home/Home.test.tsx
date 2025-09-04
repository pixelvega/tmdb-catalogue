import React from "react"
import { MemoryRouter } from "react-router-dom"
import { render, screen, waitFor, within } from "@testing-library/react"
import { test, expect, vi, describe } from "vitest"

import {
  AppContext,
  type AppContext as AppContextType,
} from "../../store/app/AppContext"

import type { InitialState } from "../../store/app/appTypes"
import { initialState } from "../../store/app/initialState"
import { type MovieListsByCategory } from "../../backend/moviesType"

import { mockMovieListsByCategory } from "../../tests/mocks/mockData"
import { setupMockFetch } from "../../tests/utils/setupMockFetch"

import Home from "./Home"

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
    <MemoryRouter>
      <AppContext.Provider value={mockContext}>{children}</AppContext.Provider>
    </MemoryRouter>
  )
}

describe("Home page", () => {
  describe("when there is no data in the context (homeData)", () => {
    test("render carouseles with movies by category", async () => {
      const mockMovies: MovieListsByCategory[] = mockMovieListsByCategory
      setupMockFetch(mockMovieListsByCategory)

      renderWithAppContext(<Home />)

      await waitFor(() => {
        expect(
          screen.getByText((content) =>
            content.toLowerCase().includes("popular")
          )
        ).toBeInTheDocument()
        expect(
          screen.getByText((content) =>
            content.toLowerCase().includes("top rated")
          )
        ).toBeInTheDocument()
        expect(
          screen.getByText((content) =>
            content.toLowerCase().includes("upcoming")
          )
        ).toBeInTheDocument()
      })

      for (const category of mockMovies) {
        const title = category.category.replace(/_/g, " ")
        const categoryTitleEl = screen.getByText(
          (text) => text.toLowerCase() === title.toLowerCase()
        )
        const categoryBlock = categoryTitleEl.closest("div")
        expect(categoryBlock).toBeTruthy()
        const utils = within(categoryBlock!)

        for (const movie of category.results) {
          expect(utils.getByText(movie.title)).toBeInTheDocument()

          const img = utils.getByRole("img", { name: movie.title })
          expect(img).toBeInTheDocument()
          expect(img).toHaveAttribute(
            "src",
            expect.stringContaining(movie.poster_path)
          )
        }
      }
    })
  })

  describe("when it already has data in the context (homeData)", () => {
    test("usa los datos del contexto y no hace fetch", async () => {
      const fetchSpy = vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        })
      )
      global.fetch = fetchSpy as any

      renderWithAppContext(<Home />, {
        views: {
          home: mockMovieListsByCategory,
          detail: undefined,
        },
      })

      await waitFor(() => {
        expect(
          screen.getByText((content) =>
            content.toLowerCase().includes("popular")
          )
        ).toBeInTheDocument()
      })
    })
  })

  describe("when an error occurs in the fetch", () => {
    test("shows the error message", async () => {
      setupMockFetch({}, 500)
      renderWithAppContext(<Home />)

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument()
      })
    })
  })

  describe("when it's loading", () => {
    test("shows the 'Loading...' message", () => {
      setupMockFetch({})
      renderWithAppContext(<Home />)

      expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })
  })
})
