import logo from "../assets/logo.svg"
import { Link, NavLink } from "react-router-dom"

import "./BaseLayout.scss"

interface Props {
  children: React.ReactNode
}

const BaseLayout = ({ children }: Props) => {
  return (
    <div className="base-layout">
      <header className="header">
        <div className="header__logo" aria-label="TMDB Max">
          <Link to="/" aria-label="Ir a la página principal de TMDB Max">
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="header__logo-icon"
            />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-list-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "header__nav-list-item__link header__nav-list-item__link--active"
                    : "header__nav-list-item__link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="header__nav-list-item">
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive
                    ? "header__nav-list-item__link header__nav-list-item__link--active"
                    : "header__nav-list-item__link"
                }
              >
                Favourites
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div>{children}</div>
    </div>
  )
}

export default BaseLayout
