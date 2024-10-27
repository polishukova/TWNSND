import { FC } from 'react'

import classNames from 'classnames'

import Facebook from '../../../assets/MediaIcons/Facebook'
import Google from '../../../assets/MediaIcons/Google'
import Vk from '../../../assets/MediaIcons/Vk'

import styles from './MediaIcons.module.scss'

type MediaIconsProps = {
  className?: string
  linkGoogle: string
  linkFacebook: string
  linkVk: string
}

const MediaIcons: FC<MediaIconsProps> = ({ className, linkGoogle, linkFacebook, linkVk }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <a href={linkFacebook} className={styles.link}>
        <Facebook />
      </a>
      <a href={linkVk} className={styles.link}>
        <Vk />
      </a>

      <a href={linkGoogle} className={styles.link}>
        <Google />
      </a>
    </div>
  )
}

export default MediaIcons
