import { TDescription } from '../../../@types/types/templatesDetails'
import styles from '../TemplatesDetails.module.scss'

type TPropsDescriptionCard = {
  data: Array<TDescription>
}

export function TemplatesDescCard({ data }: TPropsDescriptionCard) {
  return (
    <div className={styles.templatesDescCard}>
      {data.map((item) => (
        <div key={item.id} className={styles.templatesDescItem}>
          {item.title} <span>{item.text}</span>
        </div>
      ))}
    </div>
  )
}
