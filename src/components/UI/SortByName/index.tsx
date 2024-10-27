import { useState } from 'react'

import { useAppDispatch } from '../../../redux/hooks'

import { useWindowSize } from '../../../hooks/useWindowsSize'

import { offScrollModal } from '../../../utils/offScrollModal'

import { getAllFiltersPlatform } from '../../../redux/Platforms/platformsSlice'

import NameSort from '../../../assets/img/platforms/NameSort'
import Setings from '../../../assets/img/platforms/Setings'

import styles from './SortByName.module.scss'

type SortType = {
  openFilter: (value: boolean) => void
  getPlatformSortByDescending: (byDescending: boolean) => void
}

export const SortByName = ({ openFilter, getPlatformSortByDescending }: SortType) => {
  const dispatch = useAppDispatch()
  const [sortUp, setSortUp] = useState(true)

  const { width = 0 } = useWindowSize()
  const isDesktop = width > 634
  const isMobile = width < 635

  const onClickByDescendingHandler = () => {
    setSortUp(!sortUp)
    if (!sortUp) {
      getPlatformSortByDescending(false)
    } else if (sortUp) {
      getPlatformSortByDescending(true)
    }
  }

  const openFiltersOnMobile = () => {
    openFilter(true)
    offScrollModal()
    dispatch(getAllFiltersPlatform())
  }

  return (
    <div className={styles.wrap}>
      <button className={styles.sortBtn} onClick={onClickByDescendingHandler}>
        <NameSort sortByAscending={sortUp} className={styles.sortIcon} />
        {isDesktop && <p>Сортировка</p>}
      </button>
      {isMobile && (
        <button className={styles.sortBtn} onClick={openFiltersOnMobile}>
          <Setings />
        </button>
      )}
    </div>
  )
}
