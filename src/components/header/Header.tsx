import { Link, NavLink } from "react-router-dom"
import Logo from "../logo/Logo"

import "./Header.scss"

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo" aria-label="TMDB Max">
        <Link to="/" aria-label="Ir a la página principal de TMDB Max">
          <Logo />
        </Link>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-list__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "nav-list__item-link nav-list__item-link--active"
                  : "nav-list__item-link"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-list__item">
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive
                  ? "nav-list__item-link nav-list__item-link--active"
                  : "nav-list__item-link"
              }
            >
              Favourites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
