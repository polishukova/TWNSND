import { ReactElement } from 'react'

import { SpecialistsIcon } from '../../../../assets/AdminPanel/MenuIcons/specialistsIcon'
import { MainPageIcon } from '../../../../assets/AdminPanel/MenuIcons/mainPageIcon'
import { PlatformsIcon } from '../../../../assets/AdminPanel/MenuIcons/platformsIcon'
import { TemplatesIcon } from '../../../../assets/AdminPanel/MenuIcons/templatesIcon'
import { FAQIcon } from '../../../../assets/AdminPanel/MenuIcons/FAQIcon'
import { BlogIcon } from '../../../../assets/AdminPanel/MenuIcons/blogIcon'
import { ContactsIcon } from '../../../../assets/AdminPanel/MenuIcons/contactsIcon'
import { SettingsIcon } from '../../../../assets/AdminPanel/MenuIcons/settingsIcon'

interface Navlink {
  path: string
  title: string
  img: ReactElement
  isNotActive?: boolean
}

export const AdminPanelNavlinks = (): Navlink[] => {
  return [
    {
      path: '/admin/specialists',
      title: 'Cпециалисты',
      img: <SpecialistsIcon />
    },
    {
      path: '/admin/main-page',
      title: 'Главная страница',
      img: <MainPageIcon />,
      isNotActive: true
    },
    {
      path: '/admin/platforms',
      title: 'Платформы',
      img: <PlatformsIcon />
    },
    {
      path: '/admin/templates',
      title: 'Готовые решения',
      img: <TemplatesIcon />
    },
    {
      path: '/admin/faq',
      title: 'FAQ',
      img: <FAQIcon />,
      isNotActive: true
    },
    {
      path: '/admin/blog',
      title: 'Блог',
      img: <BlogIcon />,
      isNotActive: true
    },
    {
      path: '/admin/contacts',
      title: 'Контакты',
      img: <ContactsIcon />,
      isNotActive: true
    },
    {
      path: '/admin/settings',
      title: 'Настройки',
      img: <SettingsIcon />,
      isNotActive: true
    }
  ]
}
