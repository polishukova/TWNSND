import classNames from 'classnames'

import { FC } from 'react'

import styles from './SharingButton.module.scss'

export const SharingButtonAppearance = {
  VK: 'vkontakte',
  TG: 'telegram',
  WhatsApp: 'whatsApp'
} as const

export type SharingButtonAppearances = (typeof SharingButtonAppearance)[keyof typeof SharingButtonAppearance]

type SharingButtonProps = {
  type: SharingButtonAppearances
  icon: JSX.Element
  text?: string
  link: string
}

export const SharingButton: FC<SharingButtonProps> = (props) => {
  const { type, icon, text, link } = props

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames({
        [styles.btn]: true,
        [styles[type]]: true
      })}>
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.text}>{text}</div>
    </a>
  )
}
