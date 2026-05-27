import axios from 'axios'

/**
 * 郵便番号検索 composable
 */
export function useZipCode() {
  /**
   * 郵便番号から住所取得
   */
  const searchAddressByPostalCode = async (postalCode: string) => {
    try {
      const response = await axios.get(
        'https://geoapi.heartrails.com/api/json',
        {
          params: {
            method: 'searchByPostal',
            postal: postalCode,
          },
        },
      )

      /**
       * 住所情報取得
       */
      const location = response.data.response.location?.[0]

      /**
       * データなし
       */
      if (!location) {
        return null
      }

      /**
       * 必要な値だけ返却
       */
      return {
        prefecture: location.prefecture,
        city: location.city,
        town: location.town,
      }
    } catch (error) {
      console.error('郵便番号検索に失敗しました。', error)

      throw error
    }
  }

  return {
    searchAddressByPostalCode,
  }
}
