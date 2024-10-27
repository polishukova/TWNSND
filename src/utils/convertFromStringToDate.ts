export function convertFromStringToDate(dateString: string) {
  const date = new Date(dateString)

  return (
    String(date.getDate()).padStart(2, '0') +
    '.' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '.' +
    String(date.getFullYear())
  )
}
