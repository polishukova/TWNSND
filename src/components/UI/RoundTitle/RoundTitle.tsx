import classNames from 'classnames'

import styles from './RoundTitle.module.scss'

type TitleProps = {
  text: string
  isInEditMode?: boolean
}

export const RoundTitle = ({ text, isInEditMode }: TitleProps) => {
  return (
    <h5
      className={classNames(styles.template__roundTitle, {
        [styles.template__roundTitleEdited]: isInEditMode
      })}>
      {text}
    </h5>
  )
}
