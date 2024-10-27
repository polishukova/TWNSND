export function getTimePeriod(date: string) {
  const today = new Date()
  const startDate = new Date(date)

  const dayToday = today.getDate()
  const dayStartDate = startDate.getDate()
  const mounthStartDate = startDate.getMonth()
  const yearStartDate = startDate.getFullYear()

  const minutes = (+today - +startDate) / 1000 / 60
  const hours = Math.floor(minutes / 60)

  if (dayToday - 1 === dayStartDate) {
    return 'вчера'
  }

  if (dayToday - 1 > dayStartDate) {
    return `${dayStartDate}.${String(mounthStartDate + 1).padStart(2, '0')}.${yearStartDate}`
  } else {
    if (minutes < 3) {
      return 'только что'
    }
    if (3 <= minutes && minutes < 10) {
      return 'менее 10 минут назад'
    }

    if (10 <= minutes && minutes < 30) {
      return 'полчаса назад'
    }
    if (30 <= minutes && minutes < 60) {
      return 'менее часа назад'
    }

    if (60 <= minutes && minutes < 120) {
      return '1 час назад'
    }

    if (minutes >= 120) {
      return hours < 5 ? `${hours} часа назад` : `${hours} часов назад`
    }
  }
}
