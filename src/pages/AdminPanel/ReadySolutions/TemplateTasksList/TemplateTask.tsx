import { useState } from 'react'

import { useAppDispatch } from '../../../../redux/hooks'

import {
  deleteTemplateTask,
  editTemplateTask,
} from '../../../../redux/AdminTemplatesCreate/adminTemplateCreateSlice'

import { IconsModal } from '../../../../components/AppAdminPanel/CreatePlatformPanel/AdditionalSettings/AddablePossibility/IconsModal'
import { PlusSquareIcon } from '../../../../components/UI/PlusSquareIcon/PlusSquareIcon'
import { PossibTextarea } from '../../../../components/UI/PossibTextarea/PossibTextarea'

import Close from '../../../../assets/img/Close'

import styles from './TemplateTasksList.module.scss'

type TemplateTaskType = {
  task: {
    id: number
    iconId: number
    taskDescription: string[]
  }
}

export const TemplateTask = ({ task }: TemplateTaskType) => {
  const [form, setForm] = useState({
    iconId: 0,
    taskDescription: ''
  })
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useAppDispatch()

  const handleChange = (prop?: { key: string; value: any }) => {
    prop
      ? setForm({
        ...form,
        [prop.key]: prop.value
      })
      : setForm({
        iconId: 0,
        taskDescription: ''
      })
  }

  return (
    <div className={styles.taskWrap}>
      <Close
        className={styles.taskClose}
        onClick={() => {
          dispatch(deleteTemplateTask(task.id))
        }}></Close>
      <PlusSquareIcon onClick={() => setOpenModal(true)} num={task.iconId ? String(task.iconId) : ''} />
      <IconsModal
        isOpened={openModal}
        closeModal={() => setOpenModal(false)}
        choseIcon={(num) => {
          handleChange({ key: 'iconId', value: Number(num) })
          dispatch(
            editTemplateTask({
              id: task.id,
              iconId: Number(num),
              taskDescription: [form.taskDescription]
            })
          )
        }}
      />
      <PossibTextarea
        value={task.taskDescription}
        name={'taskDescription-' + task.id}
        onChange={(e) => {
          handleChange({ key: e.target.name, value: e.target.value })
          dispatch(
            editTemplateTask({
              id: task.id,
              iconId: form.iconId,
              taskDescription: [e.target.value]
            })
          )
        }}
        placeholder={'Добавить описание'}
        textMaxLength={200}
      />
    </div>
  )
}
