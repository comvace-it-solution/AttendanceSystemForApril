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

  console.log('Supabase users sample:', data)

  const rowCount = data?.length ?? 0

  return {
    ok: true,
    message: `HTTP ${status} ${statusText || 'OK'} / users rows: ${rowCount}`,
  }
}
