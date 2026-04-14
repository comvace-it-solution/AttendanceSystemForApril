import { supabase } from '../supabase/client'

type HealthResult = {
  ok: boolean
  message: string
}

export const checkSupabaseRestApi = async (): Promise<HealthResult> => {
  const { data, error, status, statusText } = await supabase.from('users').select('*').limit(1)

  if (error) {
    return {
      ok: false,
      message: `HTTP ${status} ${error.message}`,
    }
  }

  const rowCount = data?.length ?? 0

  return {
    ok: true,
    message: `HTTP ${status} ${statusText || 'OK'} / users rows: ${rowCount}`,
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
