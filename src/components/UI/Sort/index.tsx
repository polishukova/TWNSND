import { useAppDispatch } from '../../../redux/hooks'

import FilterIcon from '../../../assets/img/platforms/FilterIcon'

import { offScrollModal } from '../../../utils/offScrollModal'

import { getAllFiltersPlatform } from '../../../redux/Platforms/platformsSlice'

import styles from './Sort.module.scss'

type SortType = {
  openDetailedFilter: (value: boolean) => void
}

export const Sort: React.FC<SortType> = ({ openDetailedFilter }) => {
  const dispatch = useAppDispatch()

  return (
    <div className={styles.wrap}>
      <div
        className={styles.filter}
        onClick={() => {
          openDetailedFilter(true)
          offScrollModal()
          dispatch(getAllFiltersPlatform())
        }}>
        Фильтр
        <FilterIcon />
      </div>
    </div>
  )
}
