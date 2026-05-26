type AuthUser = {
  id: number
  userId: number
  userName: string
  password: string
}

export const fetchCurrentAuthUser = async (): Promise<AuthUser> => {
  throw new Error('ログイン情報がありません。')
}
