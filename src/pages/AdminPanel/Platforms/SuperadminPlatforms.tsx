import { PlatformIcon } from '../../../assets/AdminPanel/Platforms/Platforms'
import { FilterIcon } from '../../../assets/AdminPanel/Platforms/Filters'

import styles from './SuperadminPlatforms.module.scss'

const SuperadminPlatforms = () => {
  return (
    <div className={styles.pageWrap}>
      <div className={styles.buttonsWrap}>
        <a href="/admin/platforms/platform-collection">
          <button className={styles.specialistsButtons}>
            <div style={{ padding: '7px 10px' }} className={styles.imageWrap}>
              <PlatformIcon />
            </div>
            <div>{'Платформы'}</div>
          </button>
        </a>

        <a href="/admin/platforms/filters">
          <button className={styles.specialistsButtons}>
            <div className={styles.imageWrap}>
              <FilterIcon />
            </div>
            <div>{'Фильтры'}</div>
          </button>
        </a>
      </div>
    </div>
  )
}

export default SuperadminPlatforms
