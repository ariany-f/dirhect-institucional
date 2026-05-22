export const DEFAULT_PHONE_COUNTRY = 'BR'

/** Ordenado por nome; dial único por país (casos compartilhados simplificados). */
export const PHONE_COUNTRIES = [
  { iso: 'DE', label: 'Alemanha', dial: '49', flag: '🇩🇪', mask: 'generic', placeholder: '151 23456789' },
  { iso: 'AR', label: 'Argentina', dial: '54', flag: '🇦🇷', mask: 'generic', placeholder: '11 2345 6789' },
  { iso: 'BR', label: 'Brasil', dial: '55', flag: '🇧🇷', mask: 'br', placeholder: '(11) 99999-9999' },
  { iso: 'CA', label: 'Canadá', dial: '1', flag: '🇨🇦', mask: 'us', placeholder: '(555) 555-5559' },
  { iso: 'CL', label: 'Chile', dial: '56', flag: '🇨🇱', mask: 'generic', placeholder: '9 1234 5678' },
  { iso: 'CO', label: 'Colômbia', dial: '57', flag: '🇨🇴', mask: 'generic', placeholder: '301 2345678' },
  { iso: 'ES', label: 'Espanha', dial: '34', flag: '🇪🇸', mask: 'generic', placeholder: '612 34 56 78' },
  { iso: 'US', label: 'Estados Unidos', dial: '1', flag: '🇺🇸', mask: 'us', placeholder: '(555) 555-5555' },
  { iso: 'FR', label: 'França', dial: '33', flag: '🇫🇷', mask: 'generic', placeholder: '6 12 34 56 78' },
  { iso: 'GB', label: 'Reino Unido', dial: '44', flag: '🇬🇧', mask: 'generic', placeholder: '7911 123456' },
  { iso: 'IT', label: 'Itália', dial: '39', flag: '🇮🇹', mask: 'generic', placeholder: '312 345 6789' },
  { iso: 'MX', label: 'México', dial: '52', flag: '🇲🇽', mask: 'generic', placeholder: '55 1234 5678' },
  { iso: 'PT', label: 'Portugal', dial: '351', flag: '🇵🇹', mask: 'generic', placeholder: '912 345 678' },
  { iso: 'PY', label: 'Paraguai', dial: '595', flag: '🇵🇾', mask: 'generic', placeholder: '961 234567' },
  { iso: 'UY', label: 'Uruguai', dial: '598', flag: '🇺🇾', mask: 'generic', placeholder: '94 123 456' },
]

const BY_ISO = Object.fromEntries(PHONE_COUNTRIES.map((c) => [c.iso, c]))
const BY_DIAL_DESC = [...PHONE_COUNTRIES].sort((a, b) => b.dial.length - a.dial.length)

export function digitsOnly(value) {
  return String(value ?? '').replace(/\D/g, '')
}

export function getCountryByIso(iso) {
  return BY_ISO[iso] || BY_ISO[DEFAULT_PHONE_COUNTRY]
}

export function parsePhoneValue(value, defaultIso = DEFAULT_PHONE_COUNTRY) {
  const raw = String(value ?? '').trim()
  if (!raw) {
    const c = getCountryByIso(defaultIso)
    return { iso: c.iso, dial: c.dial, national: '' }
  }

  let all = digitsOnly(raw)
  if (raw.startsWith('+') || all.length > 11) {
    for (const c of BY_DIAL_DESC) {
      if (all.startsWith(c.dial)) {
        return { iso: c.iso, dial: c.dial, national: all.slice(c.dial.length) }
      }
    }
  }

  const def = getCountryByIso(defaultIso)
  if (def.iso === 'BR' && all.startsWith('55') && all.length > 11) {
    return { iso: 'BR', dial: '55', national: all.slice(2) }
  }
  if ((def.iso === 'US' || def.iso === 'CA') && all.startsWith('1') && all.length > 10) {
    return { iso: def.iso, dial: '1', national: all.slice(1) }
  }

  return { iso: def.iso, dial: def.dial, national: all }
}

export function formatNational(mask, nationalDigits) {
  const d = digitsOnly(nationalDigits)

  if (mask === 'br') {
    const n = d.slice(0, 11)
    if (n.length <= 2) return n
    return n.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3').replace(/[ -]$/, '')
  }

  if (mask === 'us') {
    const n = d.slice(0, 10)
    if (n.length <= 3) return n
    return n.replace(/(\d{3})(\d{0,3})(\d{0,4})/, '($1) $2-$3').replace(/[ -]$/, '')
  }

  const n = d.slice(0, 15)
  if (n.length <= 3) return n
  return n.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
}

export function buildFullPhone(iso, nationalDigits) {
  const c = getCountryByIso(iso)
  const formatted = formatNational(c.mask, nationalDigits)
  if (!formatted) return `+${c.dial}`
  return `+${c.dial} ${formatted}`
}

export function isValidPhone(value, minNationalDigits = 8) {
  const { national } = parsePhoneValue(value)
  return digitsOnly(national).length >= minNationalDigits
}
