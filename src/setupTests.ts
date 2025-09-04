import "@testing-library/jest-dom"
import { afterAll, vi } from "vitest"

afterAll(() => {
  vi.restoreAllMocks()
})
