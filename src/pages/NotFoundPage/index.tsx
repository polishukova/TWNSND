import { Link } from 'react-router-dom'

import { NotFoundPageLogo } from '../../assets/NotFoundPage/NotFoundPageLogo'
import { Logo } from '../../components/UI/Logo'

import styles from './NotFoundPage.module.scss'
import { description, linkTitle, namePage, title } from './constants'

const NotFoundPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        <div className={styles.logoMain}>
          <Logo />
        </div>
        <div className={styles.logoNotFoundPage}>
          <NotFoundPageLogo />
        </div>
        <div className={styles.description}>
          <h1 className={styles.namePage}>{namePage}</h1>
          <h2 className={styles.titlePage}>{title}</h2>
          <h3 className={styles.descriptionPage}>{description}</h3>
        </div>
        <div className={styles.link}>
          <Link to="/">{linkTitle}</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
