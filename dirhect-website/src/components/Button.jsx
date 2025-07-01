import { forwardRef } from 'react'
import './Button.css'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  icon,
  ...props 
}, ref) => {
  const baseClasses = 'btn'
  const variantClasses = `btn--${variant}`
  const sizeClasses = `btn--${size}`
  const disabledClasses = disabled ? 'btn--disabled' : ''
  const loadingClasses = loading ? 'btn--loading' : ''
  
  const classes = [
    baseClasses,
    variantClasses,
    sizeClasses,
    disabledClasses,
    loadingClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <div className="btn__spinner" />}
      {icon && !loading && <span className="btn__icon">{icon}</span>}
      <span className="btn__text">{children}</span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button 