import classNames from 'classnames'

import { useState } from 'react'

import { useWindowSize } from 'usehooks-ts'

import { Arrow } from '../../../assets/AccordionIcons/Arrow'

import styles from './AccordionItem.module.scss'

export interface FAQType {
  question: string
  answer: string
}

export const AccordionItem = ({ faq }: { faq: FAQType }) => {
  const { width = 0 } = useWindowSize()
  const [isActive, setIsActive] = useState(false)
  return (
    <li
      className={classNames(styles.accordion_item, {
        [styles.accordion_item_active]: isActive
      })}>
      <button className={styles.button} onClick={() => setIsActive(!isActive)}>
        <div className={styles.question}>{faq.question}</div>
        <div
          className={classNames(styles.arrow, {
            [styles.activeArrow]: isActive
          })}>
          {<Arrow width={width <= 480 ? '10' : undefined} height={width < 480 ? '6' : undefined} />}
        </div>
      </button>
      <div
        className={classNames(styles.answer_wrapper, {
          [styles.answer_wrapper_active]: isActive
        })}>
        <div className={styles.answer}>{faq.answer}</div>
      </div>
    </li>
  )
}
