import { AccordionItem, FAQType } from '../../UI/AccordionItem'

import styles from './Accordion.module.scss'

export const Accordion = ({ FAQs }: { FAQs: FAQType[] }) => {
  return (
    <ul className={styles.accordion}>
      {FAQs.map((faq, index) => (
        <AccordionItem key={index} faq={faq} />
      ))}
    </ul>
  )
}
