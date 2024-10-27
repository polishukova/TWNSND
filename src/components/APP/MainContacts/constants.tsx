import { TelegramFooter } from '../../../assets/FooterIcons/TelegramFooter'
import { VKFooter } from '../../../assets/FooterIcons/VKFooter'
import { WhatsAppFooter } from '../../../assets/FooterIcons/WhatsAppFooter'
import { YouTubeFooter } from '../../../assets/FooterIcons/YouTubeFooter'

import { TMainContacts } from './types'

const contacts: TMainContacts[] = [
  {
    name: 'YouTube',
    Icon: YouTubeFooter,
    link: 'https://www.youtube.com/channel/UC_jtx7lECOo0wJIf0N3_rrQ?view_as=subscriber'
  },
  {
    name: 'Telegram',
    Icon: TelegramFooter,
    link: 'https://t.me/townsenddigital'
  },
  {
    name: 'WhatsApp',
    Icon: WhatsAppFooter,
    link: 'https://api.whatsapp.com/send?phone=79119547183&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%AF%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20townsend.ru'
  },
  {
    name: 'Vkontakte',
    Icon: VKFooter,
    link: 'https://vk.com/townsend.digital'
  }
]

export const mainContacts = [...contacts, ...contacts, ...contacts, ...contacts]
