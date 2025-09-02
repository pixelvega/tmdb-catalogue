import Header from "../components/header/Header"

import "./BaseLayout.scss"

interface Props {
  children: React.ReactNode
}

const BaseLayout = ({ children }: Props) => {
  return (
    <div className="base-layout">
      <Header />
      <div className="base-layout__content">{children}</div>
    </div>
  )
}

export default BaseLayout
