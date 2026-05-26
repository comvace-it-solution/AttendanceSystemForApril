type ApiRequestOptions = {
  body?: unknown
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const INTERNAL_API_KEY = import.meta.env.VITE_INTERNAL_API_KEY

const buildApiUrl = (path: string) => {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL が設定されていません。')
  }

  return `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

const hasDataProperty = (value: unknown): value is { data: unknown } => {
  return typeof value === 'object' && value !== null && 'data' in value
}

const getErrorMessage = (value: unknown, fallback: string) => {
  if (typeof value !== 'object' || value === null) {
    return fallback
  }

  const body = value as Record<string, unknown>

  if (typeof body.message === 'string') {
    return body.message
  }

  if (typeof body.error === 'string') {
    return body.error
  }

  return fallback
}

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (INTERNAL_API_KEY) {
    headers['x-api-key'] = INTERNAL_API_KEY
  }

  const response = await fetch(buildApiUrl(path), {
    method: options.method ?? 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  })

  const contentType = response.headers.get('content-type') ?? ''
  const responseBody = contentType.includes('application/json') ? await response.json() : null

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, `API request failed: HTTP ${response.status}`))
  }

  return (hasDataProperty(responseBody) ? responseBody.data : responseBody) as T
}
