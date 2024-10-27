import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useState } from 'react'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import Modal from '../../../layout/Modal'

import { RequestData } from '../../../@types/types/request'
import { lasNameMessage, validationRules } from '../../../@types/validationRules'
import InputAuth from '../../UI/InputAuth'
import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'
import { PhoneNumberInput } from '../../UI/PhoneNumberInput/PhoneNumberInput'
import { sendRequest } from '../../../redux/Request/requestSlice'

import styles from './Request.module.scss'

interface IProps {
  closeModal: () => void
  sourcePage: string
}

const errorVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  hidden: { y: 3, opacity: 0 }
}

export const Request = ({ closeModal, sourcePage }: IProps) => {
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.userSlice)
  const [isFocus, toggleIsFocus] = useState(false)
  const [isPhoneValid, setPhoneValid] = useState(false)

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<RequestData>({
    defaultValues: {
      firstName: userData?.given_name ?? '',
      lastName: userData?.family_name ?? '',
      email: userData?.email ?? '',
      tel: '',
      comment: ''
    },
    mode: 'onBlur'
  })
  const onSubmit: SubmitHandler<RequestData> = (data) => {
    dispatch(
      sendRequest({
        data: { ...data, sourcePage },
        callback: () => {
          reset()
          closeModal()
        }
      })
    )
  }
  return (
    <Modal closeModal={closeModal}>
      <h3 className={styles.title}>Оставьте заявку</h3>
      <p className={styles.description}>Оставьте свои данные и мы с вами свяжемся</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.innerInput}>
          <Controller
            control={control}
            name="firstName"
            rules={validationRules.firstName}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputAuth
                name="firstName"
                onChange={onChange}
                onBlur={onBlur}
                onFocus={() => {
                  clearErrors('firstName')
                }}
                value={value}
                type="text"
                placeholder="Имя"
                errorInput={errors.firstName?.message}
                message={'* Имя должно содержать минимум 2 буквы'}
                activeInput={!!value}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={validationRules.lastName}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputAuth
                name="lastName"
                onChange={onChange}
                onBlur={onBlur}
                onFocus={() => {
                  clearErrors('lastName')
                }}
                value={value ? value : ''}
                type="text"
                placeholder="Фамилия"
                errorInput={errors.lastName?.message}
                activeInput={!!value}
                message={lasNameMessage}
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="email"
          rules={validationRules.emailSignUp}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputAuth
              name="email"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {
                clearErrors('email')
              }}
              value={value}
              type="text"
              placeholder="Email"
              errorInput={errors.email?.message}
              activeInput={!!value}
              message={'* Введенный адрес должен быть похож по написанию на электронный адрес *@*.*'}
            />
          )}
        />
        <Controller
          control={control}
          name="tel"
          rules={validationRules.tel}
          render={({ field: { onChange, value, onBlur } }) => (
            <PhoneNumberInput
              error={errors.tel?.message}
              name="tel"
              onFocus={() => {
                clearErrors('tel')
              }}
              onChange={onChange}
              updateIsPhoneValid={setPhoneValid}
              onBlur={onBlur}
              value={value}
              placeholder="Номер телефона"
            />
          )}
        />
        <span className={styles.areaWrapper}>
          {errors.comment && !isFocus && (
            <motion.p className={styles.error} variants={errorVariants} initial="hidden" animate="visible">
              {errors.comment.message}
            </motion.p>
          )}
          <Controller
            control={control}
            name="comment"
            rules={validationRules.comment}
            render={({ field: { onChange, value, onBlur } }) => (
              <textarea
                className={classNames(styles.commentArea, {
                  [styles.errorCommentArea]: !!errors.comment
                })}
                name="comment"
                onChange={onChange}
                onBlur={() => {
                  toggleIsFocus(false)
                  onBlur()
                }}
                onFocus={() => {
                  toggleIsFocus(true)
                  clearErrors('comment')
                }}
                value={value}
                placeholder="Комментарий"
              />
            )}
          />
          <div className={styles.symbolCount}>{watch('comment')?.length}/500</div>
        </span>
        <ButtonNew
          title={'Отправить заявку'}
          type={ButtonNewTypes.Secondary}
          buttonType="submit"
          className={styles.btn}
          disabled={
            errors.firstName ||
            errors.lastName ||
            errors.email ||
            errors.tel ||
            !watch('firstName') ||
            !watch('email') ||
            !watch('tel') ||
            !isValid ||
            !isPhoneValid
              ? true
              : false
          }
        />
      </form>
    </Modal>
  )
}

export default Request
