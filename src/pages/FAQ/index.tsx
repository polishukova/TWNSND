import { responseStatus } from '../../@types/types/responseStatus'
import { Accordion } from '../../components/APP/Accordion'
import { FAQForm } from '../../components/APP/FAQForm/FAQForm'
import Loader from '../../components/UI/Loader'
import { useAppSelector } from '../../redux/hooks'

import styles from './FAQ.module.scss'

const mockFAQs = [
  { question: 'Можно ли добавить функционал в уже готовое решение?', answer: 'Развёрнутый ответ на вопрос' },
  { question: 'Можно ли добавить функционал в уже готовое решение?', answer: 'Развёрнутый ответ на вопрос' },
  { question: 'Можно ли добавить функционал в уже готовое решение?', answer: 'Развёрнутый ответ на вопрос' },
  { question: 'Можно ли добавить функционал в уже готовое решение?', answer: 'Развёрнутый ответ на вопрос' }
]

export const FAQPage = () => {
  const { status } = useAppSelector((state) => state.contactsSlice)
  return status === responseStatus.PENDING ? (
    <Loader />
  ) : (
    <div className={styles.FAQPageWrap}>
      <h1 className={styles.title}>F.A.Q.</h1>
      <p className={styles.text}>Здесь вы найдёте ответы на часто задаваемые вопросы</p>
      <div className={styles.accordionWrap}>
        <Accordion FAQs={mockFAQs} />
      </div>
      <div className={styles.formWrap}>
        <FAQForm />
      </div>
    </div>
  )
}
