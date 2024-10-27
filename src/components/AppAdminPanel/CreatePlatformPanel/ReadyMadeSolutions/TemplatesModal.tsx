import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { TemplateNewType } from '../../../../@types/types/templates'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

import {
  /* addPopularReadyMadeSolution, */
  addReadyMadeSolution
} from '../../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import { getTemplates } from '../../../../redux/Templates/templatesSlice'

import { AdminPanelSearchBar } from '../../AdminPanelHeader/AdminPanelSearchBar/AdminPanelSearchBar'
import { SpecialistsTableFooter } from '../../SpecialistsTable/SpecialistsTableFooter/SpecialistsTableFooter'

import AdminPlatformTemplateCard from '../../../UI/AdminPlatformTemplateCard'
import ButtonNew, { ButtonNewTypes } from '../../../UI/ButtonNew'
import Loader from '../../../UI/Loader'

import { ApproveIcon } from '../../../../assets/AdminPanel/Platforms/Approve'

import styles from './ReadyMadeSolutions.module.scss'

type TemplatesModalType = {
  /* isPopular?: boolean */
  isOpen: boolean
  closeModal: () => void
}

export const TemplatesModal = ({ /* isPopular,  */ isOpen, closeModal }: TemplatesModalType) => {
  const [selectModeActive, setSelectModeActive] = useState(false)
  const [chosenSolutions, setChosenSolutions] = useState<TemplateNewType[]>([])
  const [activePage, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const { templatesCards, templatesStatus, templatesTotalCount } = useAppSelector((state) => state.templatesSlice)

  const numberOfSolutionsOnPage = 9
  const numberOfPages = Math.ceil(templatesTotalCount / numberOfSolutionsOnPage)
  const range = Array(numberOfPages)
    .fill(0)
    .map((_, index) => {
      return index + 1
    })

  useEffect(() => {
    setChosenSolutions(alreadyChosenCards)
  }, [isOpen])

  useEffect(() => {
    dispatch(
      getTemplates({
        data: {
          skip: numberOfSolutionsOnPage * (activePage - 1),
          take: numberOfSolutionsOnPage
        }
      })
    )
  }, [activePage])

  const alreadyChosenCards = useAppSelector((state) => {
    /*  if (isPopular) {
       return state.adminPlatformCreateSlice.popularReadyMadeSolutions
     } else { */
    return state.adminPlatformCreateSlice.readyMadeSolutions
    /* } */
  })

  const chooseAsTemplate = (template: TemplateNewType) => {
    if (!selectModeActive) {
      return
    }
    const isChosen = chosenSolutions.find((item) => item.id === template.id)
    if (!isChosen) {
      setChosenSolutions([...chosenSolutions, template])
    } else {
      const solutions = chosenSolutions.filter((item) => item.id !== template.id)
      setChosenSolutions(solutions)
    }
  }
  const addSolution = () => {
    /* if (isPopular) {
      dispatch(addPopularReadyMadeSolution(chosenSolutions))
    } else { */
    dispatch(addReadyMadeSolution(chosenSolutions))
    setChosenSolutions([])
    /* } */
    setSelectModeActive(false)
    closeModal()
  }

  const handleCancel = () => {
    setChosenSolutions([])
    setSelectModeActive(false)
    closeModal()
  }

  return (
    <div
      className={classNames(styles.templatesModal__background, {
        [styles.templatesModal__backgroundClosed]: !isOpen
      })}>
      <div className={styles.templatesModal}>
        {templatesStatus !== 'fullfilled' && isOpen ? (
          <Loader />
        ) : (
          <>
            <h2 className={styles.templatesModal__title}>
              {'Выберите готовое' /* + (isPopular ? ' популярное' : '') */ + ' решение'}
            </h2>
            <div className={styles.templatesModal__header}>
              <AdminPanelSearchBar value={''} onChange={() => { }} />
              <button
                className={classNames(styles.templatesModal__chooseBtnWrap, {
                  [styles.templatesModal__chooseBtnWrapActive]: selectModeActive
                })}
                onClick={() => setSelectModeActive(!selectModeActive)}>
                <ApproveIcon />
                <p>Выделить</p>
              </button>
            </div>
            <div className={classNames(styles.platformWrap, styles.platformWrapPopular)}>
              {templatesCards.map((value, index) => (
                <AdminPlatformTemplateCard
                  key={index + value.id}
                  template={value}
                  index={index}
                  className={classNames(styles.templatedCard, {
                    [styles.templatedCardSelectMode]: selectModeActive
                  })}
                  isInCreateModal
                  /* isPopular={isPopular} */
                  chooseAsTemplate={chooseAsTemplate}
                  chosenCards={chosenSolutions}
                />
              ))}
            </div>
            <div className={styles.modalBtnsWrap}>
              <SpecialistsTableFooter
                page={activePage}
                setPage={setPage}
                slice={templatesCards}
                range={range}></SpecialistsTableFooter>
              <div className={styles.modalBtns__wrap}>
                <div className={styles.modalBtns__btn}>
                  <ButtonNew title={'Добавить'} type={ButtonNewTypes.Secondary} onClick={addSolution} />
                </div>
                <div className={styles.modalBtns__btn}>
                  <ButtonNew title={'Отменить'} type={ButtonNewTypes.Primary} onClick={handleCancel} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
