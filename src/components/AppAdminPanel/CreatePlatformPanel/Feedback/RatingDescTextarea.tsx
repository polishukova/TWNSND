import { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef } from 'react'

import classNames from 'classnames'

import { useAppDispatch } from '../../../../redux/hooks'

import Close from '../../../../assets/img/Close'

import { removePlatformRatingDesc } from '../../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import styles from './Feedback.module.scss'

type RatingTextareaProps = {
  ratId: number
  value: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name: string
  textMaxLength: number
  rows?: number
}

export const RatingDescTextarea = ({
  onChange,
  ratId,
  value,
  placeholder,
  name,
  textMaxLength,
  rows,
  ...textareaProperties
}: RatingTextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const ratingTextAreaRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (ratingTextAreaRef.current) {
      ratingTextAreaRef.current.style.height = '0px'
      const { scrollHeight } = ratingTextAreaRef.current
      ratingTextAreaRef.current.style.height = `${scrollHeight}px`
    }
  }, [ratingTextAreaRef, value])

  return (
    <div className={styles.reviewDesc__textareaWrapper}>
      <textarea
        {...textareaProperties}
        className={classNames(styles.feedback__descTextarea, styles.feedback__descTextareaEdited)}
        ref={ratingTextAreaRef}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        maxLength={textMaxLength}
      />
      <Close
        className={styles.ratingDescClose}
        onClick={() => dispatch(removePlatformRatingDesc({ id: ratId, title: value }))}
      />
    </div>
  )
}
