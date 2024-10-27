import { TelegramFooter } from '../../../assets/FooterIcons/TelegramFooter'
import { VKFooter } from '../../../assets/FooterIcons/VKFooter'
import { WhatsAppFooter } from '../../../assets/FooterIcons/WhatsAppFooter'
import { YouTubeFooter } from '../../../assets/FooterIcons/YouTubeFooter'

import { TELEGRAM_LINK, VK_LINK, WHATSAPP_LINK, YOUTUBE_LINK } from '../../../pages/Contacts/constants'

import { TFooterTexts, TSocialLinks } from './types'

export const socialLinks: TSocialLinks[] = [
  {
    id: 'vk',
    Icon: VKFooter,
    link: VK_LINK
  },
  {
    id: 'youtube',
    Icon: YouTubeFooter,
    link: YOUTUBE_LINK
  },
  {
    id: 'whatsapp',
    Icon: WhatsAppFooter,
    link: WHATSAPP_LINK
  },
  {
    id: 'telegram',
    Icon: TelegramFooter,
    link: TELEGRAM_LINK
  }
]

const COPYRIGHT_TEXT: string = '@ 2024 Townsend Digital'

const ENTREPRENEUR_TEXT: string = 'Индивидуальный предприниматель Жеринова Ульяна Юрьевна'

const LOCATION_TEXT: string = 'г. Санкт-Петербург, 196240 RU'

const CONTACT_TEXT: string = '+79119547183'

export const footerTexts: TFooterTexts[] = [
  { id: 'copyright', text: COPYRIGHT_TEXT },
  { id: 'entrepreneur', text: ENTREPRENEUR_TEXT },
  { id: 'location', text: LOCATION_TEXT },
  { id: 'contact', text: CONTACT_TEXT }
]
