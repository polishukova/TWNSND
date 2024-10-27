import { Smile } from '../../../assets/img/smile'
import styles from '../TemplatesDetails.module.scss'

type TProps = {
  text: string
}

export function Task({ text }: TProps) {
  return (
    <div className={styles.taskWrap}>
      <div className={styles.taskIcon}>
        <Smile />
      </div>
      <div className={styles.taskText}>{text}</div>
    </div>
  )
}
