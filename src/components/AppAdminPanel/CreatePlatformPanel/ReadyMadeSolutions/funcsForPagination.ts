import { TemplateNewType } from '../../../../@types/types/templates'

import { mocArr } from '../../../../pages/Templates'

export const numberOfSolutionsOnPage = 6
export const solutions = [...mocArr]

const cutForPages = (array: TemplateNewType[], size: number) => {
  if (!array.length) {
    return []
  }
  const head = array.splice(0, size)
  return head
}

export const range = [
  ...Array(Math.ceil(solutions.length / numberOfSolutionsOnPage))
    .fill(0)
    .map((_, index) => {
      return index + 1
    })
]

export const paginatedArray = Array(Math.ceil(solutions.length / numberOfSolutionsOnPage))
  .fill(0)
  .map((_) => {
    return cutForPages(solutions, numberOfSolutionsOnPage)
  })
