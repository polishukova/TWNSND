import { SaveDataIcon } from '../../../assets/AdminPanel/Specialists/SaveDataIcon'
import { useAppSelector } from '../../../redux/hooks'

import styles from './SaveDataPopup.module.scss'

export const SaveDataPopup = () => {
  const showPopup = useAppSelector((state) => state.adminSlice.showPopup)

  return (
    <div className={showPopup ? styles.wrapper : styles.hide}>
      <div className={styles.img}>
        <SaveDataIcon />
      </div>
      <p className={styles.text}>Данные успешно сохранены</p>
    </div>
  )
}
