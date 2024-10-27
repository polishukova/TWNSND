import { TEvents } from '../../../@types/types/templatesDetails'
import styles from '../TemplatesDetails.module.scss'

type TProps = {
  data: TEvents
}

export function Event({ data }: TProps) {
  const { id, text } = data

  return (
    <div className={styles.eventsItem}>
      <div>
        <div className={styles.eventsIcon}>{id}</div>
      </div>
      <div className={styles.eventsText}>{text}</div>
    </div>
  )
}
