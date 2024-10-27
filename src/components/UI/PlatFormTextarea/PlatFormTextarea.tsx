import classNames from 'classnames'

import { ChangeEvent, TextareaHTMLAttributes, useEffect, useRef } from 'react'

import styles from './PlatFormTextarea.module.scss'

type PlatFormTextareaProps = {
  value: string | undefined
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name: string
  textMaxLength: number
  height?: string
  rows?: number
  error?: string
  isInEditMode?: boolean
  isActive?: boolean
  isOptional?: boolean
}

export const PlatFormTextarea = ({
  onChange,
  value,
  placeholder,
  name,
  textMaxLength,
  height,
  rows,
  error,
  isInEditMode,
  isActive,
  isOptional,
  ...textareaProperties
}: PlatFormTextareaProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = height ? height : '0px'
      const { scrollHeight } = textAreaRef.current
      textAreaRef.current.style.height = `${scrollHeight}px`
    }
  }, [textAreaRef, value])

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapperEdit]: isInEditMode
      })}>
      <textarea
        {...textareaProperties}
        className={classNames(styles.textarea, {
          [styles.textareaEdit]: isInEditMode
        })}
        ref={textAreaRef}
        name={name}
        value={value}
        placeholder={placeholder}
        rows={isInEditMode ? 1 : rows}
        onChange={onChange}
        maxLength={textMaxLength}></textarea>
    </div>
  )
}
