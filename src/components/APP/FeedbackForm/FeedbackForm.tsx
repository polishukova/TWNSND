import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useEffect, useState } from 'react'

import { FeedbackPayload } from '../../../@types/types/feedbackForm'
import { validationRules } from '../../../@types/validationRules'
import { PhoneNumberInput } from '../../UI/PhoneNumberInput/PhoneNumberInput'

import ButtonNew, { ButtonNewTypes } from '../../UI/ButtonNew'

import { FeedBackFormInput } from '../../UI/FeedbackFormInput/FeedbackFormInput'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

import { sendContactsForm } from '../../../redux/Contacts/contactsSlice'

import styles from './FeedbackForm.module.scss'

export const FeedbackForm = () => {
  const { userData } = useAppSelector((state) => state.userSlice)
  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FeedbackPayload>({
    defaultValues: { Email: '', Name: '', Phone: '', Link: '' },
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<FeedbackPayload> = (data) => {
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
    <form className={styles.feedbackForm} onSubmit={handleSubmit(onSubmit)}>
      <p className={styles.formTitle}>Форма обратной связи</p>
      <p className={styles.formText}>Хотите узнать, как мессенджеры могут помочь вам?</p>
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
        <Controller
          control={control}
          name="Link"
          render={({ field: { onChange, value, onBlur } }) => (
            <FeedBackFormInput
              name="Link"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={() => {}}
              value={value}
              type="text"
              isOptional
              placeholder="Укажите ссылку на чат-бот, про который хотите узнать"
              isActive={!!value}
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
