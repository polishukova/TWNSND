import ButtonNew, { ButtonNewTypes } from '../../../components/UI/ButtonNew'
import styles from '../TemplatesDetails.module.scss'

type TProps = {
  toggleModal: (flag: string) => void
}

export function PriceCardButtons({ toggleModal }: TProps) {
  return (
    <div className={styles.innerBtn}>
      <ButtonNew title={'Заказать решение'} type={ButtonNewTypes.Secondary} onClick={() => toggleModal('request')} />
      <ButtonNew title={'Консультация'} type={ButtonNewTypes.Primary} onClick={() => toggleModal('consultation')} />
    </div>
  )
}
