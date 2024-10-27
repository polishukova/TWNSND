import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { sendRequest } from '../../../redux/Request/requestSlice'

import Modal from '../../../layout/Modal'

import { RequestData } from '../../../@types/types/request'
import { validationRules } from '../../../@types/validationRules'
import InputAuth from '../../UI/InputAuth'
import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'

import { PhoneNumberInput } from '../../UI/PhoneNumberInput/PhoneNumberInput'
import { FeedbackPayload } from '../../../@types/types/feedbackForm'
import { sendContactsForm } from '../../../redux/Contacts/contactsSlice'

import styles from './Consultation.module.scss'

interface IProps {
  closeModal: () => void
  sourcePage: string
}

export const Consultation = ({ closeModal, sourcePage }: IProps) => {
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.userSlice)
  const [isPhoneValid, setPhoneValid] = useState(false)

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<RequestData>({
    defaultValues: {
      firstName: userData?.given_name ?? '',
      email: userData?.email ?? '',
      tel: ''
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

  console.log(isPhoneValid)

  return (
    <Modal closeModal={closeModal}>
      <h3 className={styles.title}>Нужна консультация?</h3>
      <p className={styles.description}>
        Оставьте свои контакты, и мы свяжемся с вами, чтобы ответить на ваши вопросы и определить, как
        мессенджер-маркетинг и чат-боты могут помочь вашему бизнесу
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

        <ButtonNew
          title={'Отправить '}
          type={ButtonNewTypes.Secondary}
          buttonType="submit"
          className={styles.btn}
          disabled={
            !isPhoneValid ||
            errors.firstName ||
            errors.lastName ||
            errors.tel ||
            !watch('firstName') ||
            !watch('email') ||
            !watch('tel')
              ? true
              : false
          }
        />
      </form>
    </Modal>
  )
}

export default Consultation
