import Logo from "../components/logo/Logo"
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
            <Logo />
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
      <div className="base-layout__content">{children}</div>
    </div>
  )
}

export default BaseLayout
