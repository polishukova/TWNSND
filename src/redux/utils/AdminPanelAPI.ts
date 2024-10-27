import { API_SERVER } from '../../@types/constant'
import { GetPlatforms } from '../../@types/types/platforms'

const getPlatforms = ({ skip, take, letter, byDescending }: GetPlatforms) => {
  return API_SERVER.get('/api/PlatformCard/Platforms', {
    skip,
    take,
    letter,
    byDescending
  })
}

export default {
  getPlatforms
}

// Оставили как шаблон
