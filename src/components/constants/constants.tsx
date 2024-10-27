import BlogIcon from '../../assets/SidebarIcons/BlogIcon'
import CatalogIcon from '../../assets/SidebarIcons/CatalogIcon'
import ContactsIcons from '../../assets/SidebarIcons/ContactsIcons'
import FaqAccountIcon from '../../assets/SidebarIcons/FaqAccountIcon'
import MainAccountIcon from '../../assets/SidebarIcons/MainAccountIcon'
import NewsAccountIcon from '../../assets/SidebarIcons/NewsAccountIcon'
import PlatformsIcon from '../../assets/SidebarIcons/PlatformsIcon'
import ProfileAccountIcon from '../../assets/SidebarIcons/ProfileAccountIcon'
import { TariffIcon } from '../../assets/SidebarIcons/TariffIcon'
import { PathNames } from '../../pages/Router/types'

export type sidebarItemsTypes = sidebarItemsType[]

type sidebarItemsType = {
  title: string
  icon: JSX.Element
  route: string
}

export const sortAlphabetList = [
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
  { name: 'D' },
  { name: 'E' },
  { name: 'F' },
  { name: 'G' },
  { name: 'H' },
  { name: 'I' },
  { name: 'J' },
  { name: 'K' },
  { name: 'L' },
  { name: 'M' },
  { name: 'N' },
  { name: 'O' },
  { name: 'P' },
  { name: 'Q' },
  { name: 'R' },
  { name: 'S' },
  { name: 'T' },
  { name: 'U' },
  { name: 'V' },
  { name: 'W' },
  { name: 'X' },
  { name: 'Y' },
  { name: 'Z' },
  { name: 'Показать все' }
]

export const accordionDataSort = {
  content: ['A-Z', 'Z-A']
}

export const sidebarItems = [
  {
    title: 'Личный Кабинет',
    icon: <MainAccountIcon />,
    route: '/account/main'
  },
  {
    title: 'Новости',
    icon: <NewsAccountIcon />,
    route: '/account/news'
  },
  {
    title: 'Профиль',
    icon: <ProfileAccountIcon />,
    route: '/account/profile'
  }
]

export const sidebarItemsHome = [
  {
    title: 'Главная',
    icon: <MainAccountIcon />,
    route: '/'
  },
  {
    title: 'Платформы',
    icon: <PlatformsIcon />,
    route: '/platforms'
  },
  {
    title: 'FAQ',
    icon: <FaqAccountIcon />,
    route: '/faq'
  },
  {
    title: 'Готовые решения',
    icon: <CatalogIcon />,
    route: '/templates'
  },
  {
    title: 'Блог',
    icon: <BlogIcon />,
    route: ''
  },
  {
    title: 'Контакты',
    icon: <ContactsIcons />,
    route: '/contacts'
  },
  {
    title: 'Тарифы',
    icon: <TariffIcon />,
    route: ''
  }
]

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
  centerMode: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
        variableWidth: true,
        centerMode: false
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
        variableWidth: true,
        centerMode: false
      }
    }
  ]
}

export const nav = [
  { title: 'Главная', link: PathNames.Home },
  { title: 'Платформы', link: PathNames.Platforms, linkPlatform: '/platforms' },
  { title: 'FAQ', link: PathNames.FAQ },
  { title: 'Готовые решения', link: PathNames.Templates, linkPlatform: '/templates' },
  { title: 'Блог', link: '' },
  { title: 'Контакты', link: PathNames.Contacts },
  { title: 'Тарифы', link: PathNames.Home }
]
