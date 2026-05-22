/**
 * Telefone internacional (vanilla) — espelha src/utils/phoneIntl.js
 * Uso: DirhectPhoneIntl.mount('#partner-phone-wrap', { inputId, hiddenId, defaultCountry })
 */
(function (global) {
  const DEFAULT = 'BR'
  const COUNTRIES = [
    { iso: 'DE', dial: '49', flag: '🇩🇪', mask: 'generic', placeholder: '151 23456789' },
    { iso: 'AR', dial: '54', flag: '🇦🇷', mask: 'generic', placeholder: '11 2345 6789' },
    { iso: 'BR', dial: '55', flag: '🇧🇷', mask: 'br', placeholder: '(11) 99999-9999' },
    { iso: 'CA', dial: '1', flag: '🇨🇦', mask: 'us', placeholder: '(555) 555-5559' },
    { iso: 'CL', dial: '56', flag: '🇨🇱', mask: 'generic', placeholder: '9 1234 5678' },
    { iso: 'CO', dial: '57', flag: '🇨🇴', mask: 'generic', placeholder: '301 2345678' },
    { iso: 'ES', dial: '34', flag: '🇪🇸', mask: 'generic', placeholder: '612 34 56 78' },
    { iso: 'US', dial: '1', flag: '🇺🇸', mask: 'us', placeholder: '(555) 555-5555' },
    { iso: 'FR', dial: '33', flag: '🇫🇷', mask: 'generic', placeholder: '6 12 34 56 78' },
    { iso: 'GB', dial: '44', flag: '🇬🇧', mask: 'generic', placeholder: '7911 123456' },
    { iso: 'IT', dial: '39', flag: '🇮🇹', mask: 'generic', placeholder: '312 345 6789' },
    { iso: 'MX', dial: '52', flag: '🇲🇽', mask: 'generic', placeholder: '55 1234 5678' },
    { iso: 'PT', dial: '351', flag: '🇵🇹', mask: 'generic', placeholder: '912 345 678' },
    { iso: 'PY', dial: '595', flag: '🇵🇾', mask: 'generic', placeholder: '961 234567' },
    { iso: 'UY', dial: '598', flag: '🇺🇾', mask: 'generic', placeholder: '94 123 456' },
  ]
  const BY_ISO = Object.fromEntries(COUNTRIES.map((c) => [c.iso, c]))
  const BY_DIAL = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length)

  function digits(v) {
    return String(v ?? '').replace(/\D/g, '')
  }

  function country(iso) {
    return BY_ISO[iso] || BY_ISO[DEFAULT]
  }

  function parse(value, defIso) {
    defIso = defIso || DEFAULT
    const raw = String(value ?? '').trim()
    if (!raw) return { iso: defIso, national: '' }
    let all = digits(raw)
    if (raw.indexOf('+') === 0 || all.length > 11) {
      for (let i = 0; i < BY_DIAL.length; i++) {
        const c = BY_DIAL[i]
        if (all.indexOf(c.dial) === 0) {
          return { iso: c.iso, national: all.slice(c.dial.length) }
        }
      }
    }
    const d = country(defIso)
    if (d.iso === 'BR' && all.indexOf('55') === 0 && all.length > 11) {
      return { iso: 'BR', national: all.slice(2) }
    }
    return { iso: d.iso, national: all }
  }

  function formatNat(mask, nat) {
    const n = digits(nat)
    if (mask === 'br') {
      const x = n.slice(0, 11)
      if (x.length <= 2) return x
      return x.replace(/(\d{2})(\d{0,5})(\d{0,4})/, '($1) $2-$3').replace(/[ -]$/, '')
    }
    if (mask === 'us') {
      const x = n.slice(0, 10)
      if (x.length <= 3) return x
      return x.replace(/(\d{3})(\d{0,3})(\d{0,4})/, '($1) $2-$3').replace(/[ -]$/, '')
    }
    const x = n.slice(0, 15)
    if (x.length <= 3) return x
    return x.replace(/(\d{3})(?=\d)/g, '$1 ').trim()
  }

  function build(iso, nat) {
    const c = country(iso)
    const f = formatNat(c.mask, nat)
    return f ? '+' + c.dial + ' ' + f : '+' + c.dial
  }

  function mount(container, opts) {
    opts = opts || {}
    const inputId = opts.inputId || 'partner-phone'
    const defIso = opts.defaultCountry || DEFAULT
    const parsed = parse(opts.initialValue || '', defIso)
    const root = typeof container === 'string' ? document.querySelector(container) : container
    if (!root) return null

    root.className = (root.className + ' phone-intl-row').trim()
    root.innerHTML =
      '<select class="phone-intl-country" aria-label="País"></select>' +
      '<input type="tel" class="phone-intl-number" id="' +
      inputId +
      '" autocomplete="tel" inputmode="tel" required />'

    const sel = root.querySelector('.phone-intl-country')
    const inp = root.querySelector('.phone-intl-number')
    COUNTRIES.forEach(function (c) {
      const o = document.createElement('option')
      o.value = c.iso
      o.textContent = c.flag + ' +' + c.dial
      sel.appendChild(o)
    })
    sel.value = parsed.iso
    inp.placeholder = country(parsed.iso).placeholder
    inp.value = formatNat(country(parsed.iso).mask, parsed.national)

    function sync() {
      inp.dataset.fullPhone = build(sel.value, digits(inp.value))
    }

    sel.addEventListener('change', function () {
      inp.placeholder = country(sel.value).placeholder
      sync()
    })
    inp.addEventListener('input', function () {
      const c = country(sel.value)
      const d = digits(inp.value)
      inp.value = formatNat(c.mask, d)
      sync()
    })
    sync()
    return { getValue: function () { return inp.dataset.fullPhone || build(sel.value, digits(inp.value)) }, sel: sel, inp: inp }
  }

  global.DirhectPhoneIntl = { mount: mount, build: build, parse: parse, COUNTRIES: COUNTRIES }
})(typeof window !== 'undefined' ? window : globalThis)
