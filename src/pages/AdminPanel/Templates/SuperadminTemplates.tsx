import { Link } from 'react-router-dom'

import styles from './SuperadminTemplates.module.scss'

import { templates } from './constants'

export const SuperadminTemplates = () => {
  return (
    <div className={styles.templates}>
      <div className={styles.buttonsWrap}>
        {templates.map(({ Icon, link, name }) => (
          <Link key={name} to={link}>
            <button className={styles.specialistsButtons}>
              <div className={styles.imageWrap}>
                <Icon />
              </div>
              <div>{name}</div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
