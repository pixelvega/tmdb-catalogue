import { Link } from "react-router-dom"

import BaseLayout from "../../layout/BaseLayout"

const Favourites = () => {
  return (
    <BaseLayout>
      <h1>Favourites</h1>
      <Link to={`/`}>Home</Link>
    </BaseLayout>
  )
}

export default Favourites
