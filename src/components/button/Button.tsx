import { forwardRef } from "react"
import "./Button.scss"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "solid", size = "md", className = "", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`button button--${variant} button--${size} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
