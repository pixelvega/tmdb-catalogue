interface Props {
  children: React.ReactNode
}

const BaseLayout = ({ children }: Props) => {
  return (
    <div>
      <h1>Base Layout</h1>
      <div>{children}</div>
    </div>
  )
}

export default BaseLayout
