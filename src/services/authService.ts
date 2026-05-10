import { supabase } from '../supabase/client'
import type { AuthRow, AuthUser, UserRow } from '../types/auth'

const fetchFirstUser = async (): Promise<UserRow> => {
  const { data, error } = await supabase
    .schema('public')
    .from('users')
    .select('id, user_name')
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(error.message || 'users テーブルの取得に失敗しました。')
  }

  if (!data) {
    throw new Error('users テーブルに従業員データがありません。Supabase に初期ユーザーを登録してください。')
  }

  return data as UserRow
}

export const fetchCurrentAuthUser = async (): Promise<AuthUser> => {
  const { data: authData, error: authError } = await supabase
    .schema('public')
    .from('auth')
    .select('id, user_id, password')
    .order('id', { ascending: true })
    .limit(1)
    .maybeSingle()

  if (authError || !authData) {
    const fallbackUser = await fetchFirstUser()

    return {
      id: fallbackUser.id,
      userId: fallbackUser.id,
      userName: fallbackUser.user_name,
      password: '',
    }
  }

  const authRow = authData as AuthRow

  const { data: userData, error: userError } = await supabase
    .schema('public')
    .from('users')
    .select('id, user_name')
    .eq('id', authRow.user_id)
    .maybeSingle()

  if (userError || !userData) {
    const fallbackUser = await fetchFirstUser()

    return {
      id: authRow.id,
      userId: fallbackUser.id,
      userName: fallbackUser.user_name,
      password: authRow.password,
    }
  }

  const userRow = userData as UserRow

  return {
    id: authRow.id,
    userId: authRow.user_id,
    userName: userRow.user_name,
    password: authRow.password,
  }
}
