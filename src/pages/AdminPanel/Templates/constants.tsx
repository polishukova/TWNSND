import { FilterIcon } from '../../../assets/AdminPanel/Platforms/Filters'

import { TemplateIcon } from './TemplateIcon'

type TTemplates = {
  name: string
  Icon: React.ComponentType
  link: string
}

export const templates: TTemplates[] = [
  {
    name: 'Готовые решения',
    Icon: TemplateIcon,
    link: '/admin/templates/details'
  },
  {
    name: 'Фильтры',
    Icon: FilterIcon,
    link: '/admin/templates/filters'
  }
]
