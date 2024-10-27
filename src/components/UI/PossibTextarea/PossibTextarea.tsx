import { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef } from 'react'

import classNames from 'classnames'

import styles from './PossibTextarea.module.scss'

type PlatFormTextareaProps = {
  value: string | string[]
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name: string
  textMaxLength: number
  isInEditMode?: boolean
  rows?: number
}

export const PossibTextarea = ({
  onChange,
  value,
  placeholder,
  name,
  textMaxLength,
  isInEditMode,
  rows,
  ...textareaProperties
}: PlatFormTextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const possibTextAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (possibTextAreaRef.current) {
      possibTextAreaRef.current.style.height = '0px'
      const { scrollHeight } = possibTextAreaRef.current
      possibTextAreaRef.current.style.height = `${scrollHeight}px`
    }
  }, [possibTextAreaRef, value])

  return (
    <div className={styles.possib__textareaWrapper}>
      <textarea
        {...textareaProperties}
        className={classNames(styles.possib__textarea, {
          [styles.possib__textareaEdited]: isInEditMode
        })}
        ref={possibTextAreaRef}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        maxLength={textMaxLength}></textarea>
    </div>
  )
}
