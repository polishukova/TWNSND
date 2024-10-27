import { useState } from 'react'

import { CreatePlatformSetting } from '../../../../../@types/types/adminPanel/adminPanelPlatforms'
import { useAppDispatch } from '../../../../../redux/hooks'

import {
  editPlatformBasicPossibility,
  editPlatformLongPossibility,
  editPlatformSetting,
  removePlatformBasicPossibility,
  removePlatformLongPossibility,
  removePlatformSetting
} from '../../../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import { PossibInput } from '../../../../UI/PossibInput/PossibInput'

import { PossibTextarea } from '../../../../UI/PossibTextarea/PossibTextarea'

import Close from '../../../../../assets/img/Close'

import { IconsModal } from './IconsModal'

import styles from './AddablePossibility.module.scss'

type PossibProps = {
  title: string
  field: CreatePlatformSetting
}

export const AddablePossibEditField = ({ title, field }: PossibProps) => {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <div
      key={title + field.id}
      className={title === 'Настройки' ? styles.addSettingsPanelItem : styles.addPossibilityItem}>
      <Close
        className={styles.addSettingsPanelItem__close}
        onClick={() => {
          if (title === 'Настройки') dispatch(removePlatformSetting(field.id))
          if (title === 'Базовые возможности') dispatch(removePlatformBasicPossibility(field.id))
          if (title === 'Дополнительные возможности') dispatch(removePlatformLongPossibility(field.id))
        }}></Close>
      {title === 'Настройки' && (
        <button className={styles.plussquareicon} onClick={() => setOpenModal(true)}>
          <span className={'icon-' + field.imageUrl}></span>
        </button>
      )}
      {title === 'Настройки' && (
        <IconsModal
          choseIcon={(num) => {
            dispatch(
              editPlatformSetting({
                id: field.id,
                title: field.title ? field.title : '',
                text: field.text ? field.text : '',
                imageUrl: num
              })
            )
          }}
          isOpened={openModal}
          closeModal={() => setOpenModal(false)}
        />
      )}
      <PossibInput
        isInEditMode
        type={'text'}
        value={field.title}
        name={'possibTitle'}
        placeholder={'Введите заголовок'}
        onChange={(e) => {
          if (title === 'Настройки') {
            dispatch(
              editPlatformSetting({
                id: field.id,
                title: e.target.value,
                text: field.text ? field.text : '',
                imageUrl: field.imageUrl ? field.imageUrl : ''
              })
            )
          }
          if (title === 'Базовые возможности') {
            dispatch(
              editPlatformBasicPossibility({
                id: field.id,
                title: e.target.value,
                text: field.text ? field.text : ['']
              })
            )
          }
          if (title === 'Дополнительные возможности') {
            dispatch(
              editPlatformLongPossibility({
                id: field.id,
                title: e.target.value,
                text: field.text ? field.text : ['']
              })
            )
          }
        }}></PossibInput>
      <PossibTextarea
        isInEditMode
        value={field.text}
        name={'possibDescription'}
        placeholder={'Добавить описание'}
        textMaxLength={title === 'Настройки' ? 200 : 500}
        onChange={(e) => {
          if (title === 'Настройки') {
            dispatch(
              editPlatformSetting({
                id: field.id,
                title: field.title ? field.title : '',
                text: e.target.value,
                imageUrl: field.imageUrl ? field.imageUrl : ''
              })
            )
          }
          if (title === 'Базовые возможности') {
            dispatch(
              editPlatformBasicPossibility({
                id: field.id,
                title: field.title ? field.title : '',
                text: [e.target.value]
              })
            )
          }
          if (title === 'Дополнительные возможности') {
            dispatch(
              editPlatformLongPossibility({
                id: field.id,
                title: field.title ? field.title : '',
                text: [e.target.value]
              })
            )
          }
        }}></PossibTextarea>
    </div>
  )
}
