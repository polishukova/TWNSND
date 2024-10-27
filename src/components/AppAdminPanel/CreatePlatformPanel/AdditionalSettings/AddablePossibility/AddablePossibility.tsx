import { useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'

import {
  addPlatformBasicPossibility,
  addPlatformLongPossibility,
  addPlatformSettings
} from '../../../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import { useOnClickOutside } from '../../../../../hooks/useOnClickOutside'

import { PlusSquareIcon } from '../../../../UI/PlusSquareIcon/PlusSquareIcon'

import { PossibInput } from '../../../../UI/PossibInput/PossibInput'

import { PossibTextarea } from '../../../../UI/PossibTextarea/PossibTextarea'

import { AddablePossibEditField } from './AddablePossibEditField'

import { IconsModal } from './IconsModal'

import styles from './AddablePossibility.module.scss'

type PossibProps = {
  plusIncluded?: boolean
  title: string
  isInEditMode?: boolean
  showTitle?: boolean
}

export const AddablePossibility = ({ plusIncluded, showTitle = true, title, isInEditMode = true }: PossibProps) => {
  const [form, setForm] = useState({
    possibTitle: '',
    possibDescription: '',
    iconUrl: ''
  })
  const [openModal, setOpenModal] = useState(false)

  const handleChange = (prop?: { key: string; value: any }) => {
    prop
      ? setForm({
          ...form,
          [prop.key]: prop.value
        })
      : setForm({
          possibTitle: '',
          possibDescription: '',
          iconUrl: ''
        })
  }

  const list = useAppSelector((state) => {
    if (title === 'Настройки') return state.adminPlatformCreateSlice.settings
    if (title === 'Базовые возможности') return state.adminPlatformCreateSlice.basicPossibility
    if (title === 'Дополнительные возможности') return state.adminPlatformCreateSlice.additionalPossibility
  })

  const possibRef = useRef(null)
  const dispatch = useAppDispatch()
  useOnClickOutside(possibRef, () => {
    if (form.possibTitle && form.possibDescription && (plusIncluded ? form.iconUrl : true)) {
      if (title === 'Настройки')
        dispatch(addPlatformSettings({ title: form.possibTitle, text: form.possibDescription, imageUrl: form.iconUrl }))
      if (title === 'Базовые возможности')
        dispatch(addPlatformBasicPossibility({ title: form.possibTitle, text: [form.possibDescription] }))
      if (title === 'Дополнительные возможности')
        dispatch(addPlatformLongPossibility({ title: form.possibTitle, text: [form.possibDescription] }))
      handleChange()
    }
  })
  return (
    <div className={styles.addSettings__section}>
      {showTitle && <h4 className={styles.addSettings__title}>{title}</h4>}
      <div className={styles.addSettings__possibility} ref={possibRef}>
        {plusIncluded && <PlusSquareIcon onClick={() => setOpenModal(true)} num={form.iconUrl} />}
        {plusIncluded && (
          <IconsModal
            isOpened={openModal}
            closeModal={() => setOpenModal(false)}
            choseIcon={(num) => handleChange({ key: 'iconUrl', value: num })}
          />
        )}
        {isInEditMode && (
          <PossibInput
            type={'text'}
            value={form.possibTitle}
            name={'possibTitle'}
            onChange={(e) => handleChange({ key: e.target.name, value: e.target.value })}
            placeholder={'Введите заголовок'}
          />
        )}
        <PossibTextarea
          value={form.possibDescription}
          name={'possibDescription'}
          onChange={(e) => handleChange({ key: e.target.name, value: e.target.value })}
          placeholder={'Добавить описание'}
          textMaxLength={title === 'Настройки' ? 200 : 500}
        />
      </div>
      {list && list.length !== 0 && (
        <div className={title !== 'Настройки' ? styles.addSettingsPanel : styles.addSettingsWithIconsPanel}>
          {list.map((item, index) => (
            <AddablePossibEditField key={'possibField-' + item.title[0] + index} field={item} title={title} />
          ))}
        </div>
      )}
    </div>
  )
}
