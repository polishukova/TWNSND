import { Link } from 'react-router-dom'

import AddCard from '../../../assets/AccountIcons/AddCard'

import styles from './CreateCard.module.scss'

interface IProps {
  title: string
  description: string
  link: string
}

const CreateCard = ({ title, description, link }: IProps) => {
  return (
    <div className={styles.wrap}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className={styles.border}>
        <rect x="0" y="0" rx="30" width="100%" height="100%" className={styles.borderRect} />
      </svg>
      <div className={styles.innerImg}>
        <Link to={link}>
          <AddCard clasName={styles.svg} />
        </Link>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  )
}

export default CreateCard
