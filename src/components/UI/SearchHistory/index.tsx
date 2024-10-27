import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import SearchHistoryIcon from '../../../assets/SidebarIcons/SearchHistoryIcon'
import { PathNames } from '../../../pages/Router/types'

import styles from './SearchHistory.module.scss'

const SearchHistory = () => {
  const { pathname } = useLocation()

  return (
    <Link to={PathNames.SearchHistory}>
      <div
        className={classNames(styles.searchHistoryContainer, {
          [styles.active]: PathNames.SearchHistory === pathname
        })}>
        <SearchHistoryIcon active={PathNames.SearchHistory === pathname} />
        <span className={styles.searchHistoryTitle}>История поиска</span>
        <span className={styles.searchHistoryDescription}>Шаблоны и платформы, просмотренные за последнее время</span>
      </div>
    </Link>
  )
}

export default SearchHistory
