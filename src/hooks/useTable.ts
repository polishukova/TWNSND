import { useEffect, useState } from 'react'

import { Specialist } from '../@types/types/adminPanel/adminPanelPlatforms'

const calculateRange = (data: Specialist[], rowsPerPage: number) => {
  const range = []
  const num = Math.ceil(data.length / rowsPerPage)
  for (let i = 1; i <= num; i++) {
    range.push(i)
  }
  return range
}

const getDataSlice = (data: Specialist[], page: number, rowsPerPage: number) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
}

export const useTable = (data: Specialist[], page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([])
  const [slice, setSlice] = useState<Specialist[]>([])

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage)
    setTableRange([...range])

    const slice = getDataSlice(data, page, rowsPerPage)
    setSlice([...slice])
  }, [data, setTableRange, page, setSlice, rowsPerPage])

  return { slice, range: tableRange }
}
