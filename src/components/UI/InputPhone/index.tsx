import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useDispatch } from 'react-redux'

import { useState } from 'react'

import { sendRequest } from '../../../redux/Request/requestSlice'

import { RequestData } from '../../../@types/types/request'

import { validationRules } from '../../../@types/validationRules'
import { PhoneNumberInput } from '../PhoneNumberInput/PhoneNumberInput'

interface IProps {
  closeModal: () => void
  sourcePage: string
  updateIsPhoneValid?: (value: boolean) => void
}

export const InputPhone = ({ closeModal, sourcePage, updateIsPhoneValid }: IProps) => {
  const dispatch = useDispatch()
  const [isPhoneValid, setPhoneValid] = useState(false)

  const {
    control,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<RequestData>({
    defaultValues: {
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

  return (
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
  )
}
