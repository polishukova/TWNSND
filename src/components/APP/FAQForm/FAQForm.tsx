import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useEffect, useState } from 'react'

import { FeedbackPayload } from '../../../@types/types/feedbackForm'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { validationRules } from '../../../@types/validationRules'
import { FeedBackFormInput } from '../../UI/FeedbackFormInput/FeedbackFormInput'

import { PhoneNumberInput } from '../../UI/PhoneNumberInput/PhoneNumberInput'

import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'

import { sendContactsForm } from '../../../redux/Contacts/contactsSlice'

import styles from './FAQForm.module.scss'

export const FAQForm = () => {
  const { userData } = useAppSelector((state) => state.userSlice)
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Omit<FeedbackPayload, 'Link'>>({
    defaultValues: { Email: '', Name: '', Phone: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<Omit<FeedbackPayload, 'Link'>> = (data) => {
    dispatch(sendContactsForm(data))
  }

  useEffect(() => {
    if (userData) {
      setValue('Email', userData.email)
      setValue('Name', userData.given_name)
    }
  }, [setValue, userData])

  const [isPhoneValid, setPhoneValid] = useState(false)

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.formTitle}>Нужна консультация?</p>
      <p className={styles.formText}>
        Оставьте свои контакты, и мы свяжемся с вами, чтобы ответить на ваши вопросы и определить, как
        мессенджер-маркетинг и чат-боты могут помочь вашему бизнесу
      </p>
      <div className={styles.inputsWrap}>
        <Controller
          control={control}
          name="Email"
          rules={validationRules.emailSignUp}
          render={({ field: { onChange, value, onBlur } }) => (
            <FeedBackFormInput
              name="Email"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {
                clearErrors('Email')
              }}
              value={value}
              type="text"
              placeholder="Email"
              error={errors.Email?.message}
              isActive={!!value}
            />
          )}
        />
        <Controller
          control={control}
          name="Name"
          rules={validationRules.firstName}
          render={({ field: { onChange, value, onBlur } }) => (
            <FeedBackFormInput
              name="FirstName"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {
                clearErrors('Name')
              }}
              value={value}
              type="text"
              placeholder="Имя"
              error={errors.Name?.message}
              isActive={!!value}
            />
          )}
        />
        <Controller
          control={control}
          rules={{ required: '* Это поле обязательно к заполнению' }}
          name="Phone"
          render={({ field: { onChange, value, onBlur } }) => (
            <PhoneNumberInput
              error={errors.Phone?.message}
              name="Phone"
              onFocus={() => {
                clearErrors('Phone')
              }}
              onChange={onChange}
              updateIsPhoneValid={setPhoneValid}
              onBlur={onBlur}
              value={value}
              placeholder="Номер телефона"
            />
          )}
        />
      </div>
      <ButtonNew
        type={ButtonNewTypes.Secondary}
        title={'Отправить'}
        buttonType="submit"
        className={styles.btn}
        disabled={
          errors.Email ||
          errors.Name ||
          errors.Phone ||
          !isPhoneValid ||
          !watch('Email') ||
          !watch('Name') ||
          !watch('Phone')
            ? true
            : false
        }
      />
    </form>
  )
}
