import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { removePublished, publish, archive } from '../../../redux/StateModalWindows/StateModalWindows'

import {
  IWindowtoRemove,
  IWindowtotoPublish,
  IWindowtoArchive
} from '../../../@types/types/modalWindow/interfacesStateModalWindow'
import { getTemplates, moveToArchive, publishUnpublishTemplate } from '../../../redux/Templates/templatesSlice'

import styles from './ModalWindow.module.scss'

interface IProps {
  type: 'toRemovePublished' | 'toPublish' | 'toArchive'
  title: string
}

const ModalWindow: React.FC<IProps> = ({ title, type }) => {
  const stateModalRemovePublished = useAppSelector(
    (state: IWindowtoRemove) => state.stateModalWindows.toRemovePublished
  )
  const stateModalPublish = useAppSelector((state: IWindowtotoPublish) => state.stateModalWindows.toPublish)
  const stateModalArchive = useAppSelector((state: IWindowtoArchive) => state.stateModalWindows.toArchive)
  const isOpenWindowRemovePublished = stateModalRemovePublished && type === 'toRemovePublished'
  const isOpenWindowPublish = stateModalPublish && type === 'toPublish'
  const isOpenWindowArchive = stateModalArchive && type === 'toArchive'
  const { idTemplateCard } = useAppSelector((state) => state.stateModalWindows)

  const location = useLocation()
  const TEMPLATES_CARD_URL = '/admin/templates/details'
  const templatesDetails = location.pathname === TEMPLATES_CARD_URL

  const dispatch = useAppDispatch()
  const toPublishCard = (type: 'toRemovePublished' | 'toPublish' | 'toArchive') => {
    if (type === 'toRemovePublished') {
      toggleTemplate()
      dispatch(removePublished())
    } else if (type === 'toArchive') {
      moveToArchiveFunc()
      dispatch(archive())
    } else {
      toggleTemplate()
      dispatch(publish())
    }
  }

  const toRemovePublishedCard = (type: 'toRemovePublished' | 'toPublish' | 'toArchive') => {
    if (type === 'toRemovePublished') {
      dispatch(removePublished())
    } else if (type === 'toArchive') {
      dispatch(archive())
    } else {
      dispatch(publish())
    }
  }

  const toggleTemplate = () => {
    dispatch(
      publishUnpublishTemplate({
        platformTemplateId: idTemplateCard,
        callback: () => {
          dispatch(
            getTemplates({
              data: {
                take: 11,
                isShowUnpublished: true
              }
            })
          )
        }
      })
    )
  }

  const moveToArchiveFunc = () => {
    templatesDetails &&
      dispatch(
        moveToArchive({
          platformTemplateId: idTemplateCard,
          callback: () =>
            dispatch(
              getTemplates({
                data: {
                  take: 11,
                  isShowUnpublished: true
                }
              })
            )
        })
      )
  }

  return (
    <>
      <div
        className={`${styles.wrapper} ${
          (isOpenWindowRemovePublished || isOpenWindowPublish || isOpenWindowArchive) && styles.isVisibility
        }`}>
        <div className={styles.wrapperBody}>
          <header className={styles.wrapperHeader}>
            <h2 className={styles.wrapperTitle}>{title}</h2>
          </header>
          <footer className={styles.wrapperFooter}>
            <div className={styles.wrapperOption}>
              <button className={styles.wrapperOption} onClick={() => toPublishCard(type)}>
                Да
              </button>
            </div>
            <div className={styles.wrapperOption}>
              <button className={styles.wrapperOption} onClick={() => toRemovePublishedCard(type)}>
                Нет
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default ModalWindow
