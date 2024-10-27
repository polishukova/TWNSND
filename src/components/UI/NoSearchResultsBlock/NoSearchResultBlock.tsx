import classNames from 'classnames'

import { useAppSelector } from '../../../redux/hooks'

import imgSearch from '../../../assets/img/search.svg'

import styles from './NoSearchResultBlock.module.scss'

type NoSearchResultBlockType = {
  searchValue: string
}

export const NoSearchResultBlock = ({ searchValue }: NoSearchResultBlockType) => {
  const { statusPlatforms } = useAppSelector((state) => state.statusPlatformsSlice)
  return (
    <div
      className={classNames(styles.searchImg, {
        [styles.searchActiv]: statusPlatforms === 'fullfilled'
      })}>
      <img src={imgSearch} alt="поиск не дал результата" />
      <div className={styles.searchTitle}>Ничего не удалось найти</div>
      {searchValue && <div className={styles.searchText}>Нет совпадений по запросу “{searchValue}”</div>}
    </div>
  )
}
