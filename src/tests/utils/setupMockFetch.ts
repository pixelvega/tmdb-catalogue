import { vi } from "vitest"

export function setupMockFetch(
  response: unknown,
  status: number = 200
): typeof fetch {
  const mock = vi.fn(() => {
    if (status === 200) {
      return Promise.resolve({
        json: () => Promise.resolve(response),
      })
    } else {
      return Promise.reject(new Error("Error fetching data"))
    }
  })
  global.fetch = mock as unknown as typeof fetch
  return mock as unknown as typeof fetch
}
