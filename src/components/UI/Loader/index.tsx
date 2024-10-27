import classNames from 'classnames'
import { FC } from 'react'

import styles from './Loader.module.scss'

type LoaderType = {
  className?: string
}
const Loader: FC<LoaderType> = ({ className }) => {
  return (
    <div className={classNames(styles.wrap, className)}>
      <div className={styles.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
export default Loader
