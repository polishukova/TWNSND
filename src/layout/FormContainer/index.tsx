import { ReactElement } from 'react'

import classNames from 'classnames'

import styles from './FormContainer.module.scss'

type FormContainerType = {
  logo?: string
  title?: string
  link?: string
  textLink?: string
  text?: string
  children: ReactElement
  className?: string
}

const FormContainer: React.FC<FormContainerType> = ({ logo, title, children, link, textLink, text, className }) => {
  return (
    <div className={styles.wrap}>
      <div className={classNames(styles.inner, className)}>
        <h1 className={styles.title}>{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default FormContainer
