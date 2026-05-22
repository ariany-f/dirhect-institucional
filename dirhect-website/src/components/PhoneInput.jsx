import { useEffect, useState } from 'react'
import {
  buildFullPhone,
  formatNational,
  getCountryByIso,
  parsePhoneValue,
  PHONE_COUNTRIES,
} from '../utils/phoneIntl'
import './PhoneInput.css'

/**
 * Telefone internacional: país (+55, +1, …) + número formatado.
 * onChange: evento sintético { target: { name, value } }.
 */
const PhoneInput = ({
  id,
  name,
  label,
  value = '',
  onChange,
  required = false,
  disabled = false,
  className = '',
  icon = null,
  defaultCountry = 'BR',
}) => {
  const parsed = parsePhoneValue(value, defaultCountry)
  const [countryIso, setCountryIso] = useState(parsed.iso)
  const [national, setNational] = useState(parsed.national)

  useEffect(() => {
    const next = parsePhoneValue(value, defaultCountry)
    setCountryIso(next.iso)
    setNational(next.national)
  }, [value, defaultCountry])

  const country = getCountryByIso(countryIso)
  const displayNational = formatNational(country.mask, national)

  const emit = (iso, nationalDigits) => {
    if (onChange) {
      onChange({
        target: {
          name: name ?? id,
          value: buildFullPhone(iso, nationalDigits),
        },
      })
    }
  }

  const handleCountryChange = (e) => {
    const iso = e.target.value
    setCountryIso(iso)
    emit(iso, national)
  }

  const handleNationalInput = (e) => {
    const c = getCountryByIso(countryIso)
    const digits = e.target.value.replace(/\D/g, '')
    setNational(digits)
    emit(countryIso, digits)
  }

  const rootClass = ['phone-input', icon ? 'phone-input--icon-left' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClass}>
      {label ? (
        <label className="phone-input__label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className="phone-input__row">
        {icon ? <span className="phone-input__icon">{icon}</span> : null}
        <select
          className="phone-input__country"
          value={countryIso}
          onChange={handleCountryChange}
          disabled={disabled}
          aria-label="País do telefone"
        >
          {PHONE_COUNTRIES.map((c) => (
            <option key={c.iso} value={c.iso}>
              {c.flag} +{c.dial}
            </option>
          ))}
        </select>
        <input
          type="tel"
          id={id}
          name={name}
          className="phone-input__number"
          value={displayNational}
          onChange={handleNationalInput}
          placeholder={country.placeholder}
          required={required}
          disabled={disabled}
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
    </div>
  )
}

export default PhoneInput
