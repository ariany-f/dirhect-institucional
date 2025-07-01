import { forwardRef, useState } from 'react'
import './Input.css'

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className = '',
  icon,
  iconPosition = 'left',
  variant = 'default',
  size = 'md',
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  const baseClasses = 'input-field'
  const variantClasses = `input-field--${variant}`
  const sizeClasses = `input-field--${size}`
  const errorClasses = error ? 'input-field--error' : ''
  const focusClasses = isFocused ? 'input-field--focused' : ''
  const iconClasses = icon ? `input-field--with-icon input-field--icon-${iconPosition}` : ''
  
  const classes = [
    baseClasses,
    variantClasses,
    sizeClasses,
    errorClasses,
    focusClasses,
    iconClasses,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      
      <div className="input-container">
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon--left">
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          className={classes}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="input-icon input-icon--right">
            {icon}
          </span>
        )}
      </div>
      
      {error && (
        <span className="input-error">
          {error}
        </span>
      )}
      
      {helperText && !error && (
        <span className="input-helper">
          {helperText}
        </span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input 