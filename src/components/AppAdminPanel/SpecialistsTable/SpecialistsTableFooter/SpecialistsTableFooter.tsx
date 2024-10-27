import { useEffect } from 'react'

import classNames from 'classnames'

import { TemplateNewType } from '../../../../@types/types/templates'

import { Specialist } from '../../../../@types/types/adminPanel/adminPanelPlatforms'

import { ArrowLeft } from '../../../../assets/AdminPanel/Specialists/ArrowLeft'
import { ArrowRight } from '../../../../assets/AdminPanel/Specialists/ArrowRight'

import styles from './SpecialistsTableFooter.module.scss'

export const SpecialistsTableFooter = ({
  range,
  setPage,
  page,
  slice
}: {
  range: number[]
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  slice: Specialist[] | TemplateNewType[]
}) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1)
    }
  }, [slice, page, setPage])

  return (
    <div className={styles.footer}>
      <button
        className={classNames(styles.arrows, { [styles.arrows_disabled]: page === range[0] })}
        onClick={() => setPage(page - 1)}
        disabled={page === range[0]}>
        <div>
          <ArrowLeft />
        </div>
      </button>
      {range.map((el, index) => (
        <button
          key={index}
          onClick={() => setPage(el)}
          className={classNames(styles.numbers, { [styles.numbers_active]: page === el })}>
          {el}
        </button>
      ))}
      <button
        className={classNames(styles.arrows, { [styles.arrows_disabled]: page === range[range.length - 1] })}
        onClick={() => setPage(page + 1)}
        disabled={page === range[range.length - 1]}>
        <div>
          <ArrowRight />
        </div>
      </button>
    </div>
  )
}
