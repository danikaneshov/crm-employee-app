import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const MANIFEST_PATH = '/manifest-client.json'
const LAST_COMPANY_SLUG_KEY = 'last_company_slug'
const LAST_COMPANY_SLUG_COOKIE = 'last_company_slug'

function getCookie(name) {
  if (typeof document === 'undefined') {
    return null
  }

  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))

  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
}

function persistLastCompanySlug(slug) {
  if (typeof window === 'undefined' || !slug) {
    return
  }

  window.localStorage.setItem(LAST_COMPANY_SLUG_KEY, slug)
  document.cookie = `${LAST_COMPANY_SLUG_COOKIE}=${encodeURIComponent(slug)}; path=/; max-age=31536000; samesite=lax`
}

async function configureTenantStartUrlInManifest() {
  const manifestLink = document.querySelector('link[rel="manifest"]')

  if (!manifestLink || typeof window === 'undefined') {
    return
  }

  const pathParts = window.location.pathname.split('/').filter(Boolean)
  const currentSlug = pathParts[0]
  const savedSlug = window.localStorage.getItem(LAST_COMPANY_SLUG_KEY) || getCookie(LAST_COMPANY_SLUG_COOKIE)
  const targetSlug = currentSlug || savedSlug
  const startUrl = targetSlug ? `/${targetSlug}` : '/'

  if (currentSlug) {
    persistLastCompanySlug(currentSlug)
  }

  try {
    const response = await fetch(MANIFEST_PATH, { cache: 'no-store' })

    if (!response.ok) {
      return
    }

    const manifest = await response.json()
    manifest.start_url = startUrl

    const manifestBlob = new Blob([JSON.stringify(manifest)], {
      type: 'application/manifest+json',
    })
    const manifestUrl = URL.createObjectURL(manifestBlob)

    manifestLink.setAttribute('href', manifestUrl)
    window.addEventListener(
      'beforeunload',
      () => URL.revokeObjectURL(manifestUrl),
      { once: true }
    )
  } catch {
    // Keep default manifest as fallback.
  }
}

configureTenantStartUrlInManifest()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
