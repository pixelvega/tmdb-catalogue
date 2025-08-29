import { useEffect, useState } from "react"

const Error = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  return <div>Error</div>
}

export default Error
