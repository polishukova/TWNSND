import { forwardRef } from 'react'

import { TEvents } from '../../../../@types/types/templatesDetails'

import { useAppDispatch } from '../../../../redux/hooks'
import { deleteTemplateEvent, editTemplateEvent } from '../../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'

import Close from '../../../../assets/img/Close'

import { PossibTextarea } from '../../../../components/UI/PossibTextarea/PossibTextarea'

import styles from './AddEvent.module.scss'


type TProps = {
  data: TEvents
}

export const AddEvent = forwardRef<HTMLInputElement, TProps>(({ data }) => {
  const { id, text } = data
  const dispatch = useAppDispatch()

  return (
    <div className={styles.eventsItem} id={String(id)}>
      <Close
        className={styles.eventsClose}
        onClick={() => {
          dispatch(deleteTemplateEvent(Number(id)))
        }}></Close>
      <div>
        <div className={styles.eventsIcon}>{id}</div>
      </div>
      <PossibTextarea
        value={text}
        name={'eventDescription-' + id}
        onChange={(e) => {
          dispatch(editTemplateEvent({
            id: Number(data.id),
            text: e.target.value
          }))
        }}
        placeholder={'Добавить описание'}
        textMaxLength={200}
      />
    </div>
  )
})
