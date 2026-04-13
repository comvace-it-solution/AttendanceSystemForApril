import { supabase } from '../supabase/client'

type HealthResult = {
  ok: boolean
  message: string
}

export const checkSupabaseRestApi = async (): Promise<HealthResult> => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/`, {
    method: 'GET',
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
  })

  return {
    ok: response.ok,
    message: `HTTP ${response.status} ${response.statusText || ''}`.trim(),
  }
}

export const getSupabaseSessionState = async (): Promise<HealthResult> => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    return {
      ok: false,
      message: error.message,
    }
  }

  return {
    ok: true,
    message: data.session ? 'session available' : 'session not found',
  }
}
