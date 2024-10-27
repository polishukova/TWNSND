export function checkDelay(index: number, countCard: number, page?: number, searchValue?: string, pageSearch?: number) {
  if (searchValue) {
    return pageSearch ? (index - pageSearch * countCard) * 0.1 : index * 0.1
  } else {
    return page ? (index - page * countCard) * 0.1 : index * 0.1
  }
}
