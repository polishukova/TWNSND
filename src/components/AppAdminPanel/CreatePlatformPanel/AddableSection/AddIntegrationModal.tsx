import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { ParamersFiltersType } from '../../../../@types/types/platforms'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

import { setChosenFilters, setReceivedFilters } from '../../../../redux/AdminPlatformCreate/adminFiltersSlice'

import ButtonNew, { ButtonNewTypes } from '../../../UI/ButtonNew'

import styles from './AddableSection.module.scss'

type ModalType = {
  id: number
  title: string
  isOpened: boolean
  closeModal: () => void
  params?: ParamersFiltersType[]
  filterName: string
  filterId: number
}

export const AddIntegrationModal = ({ id, isOpened, closeModal, title, params, filterName, filterId }: ModalType) => {
  const [chosenList, setChosenList] = useState<ParamersFiltersType[]>([])
  const dispatch = useAppDispatch()
  const chosenData = useAppSelector((state) => state.adminFiltersSlice.chosenFiltersUI)

  useEffect(() => {
    const chosenCategory = chosenData.find((category) => category.id === filterId)
    const chosenFilter = chosenCategory?.filters.find((filter) => filter.id === id)
    if (chosenFilter) {
      setChosenList(chosenFilter.parameters)
    }
  }, [isOpened])

  return (
    <div className={isOpened ? styles.modalTag : styles.modalTagClosed}>
      <div className={classNames(styles.modalTag__content, styles.modalTag__contentLarge)}>
        <h2 className={styles.modalTitle}>{title + ':'}</h2>
        <div className={styles.filterParamWrapper}>
          {params &&
            params.map((param) => (
              <div
                className={
                  chosenList.find((item) => item.name === param.name)
                    ? classNames(styles.filterParam, styles.filterParamChosen)
                    : styles.filterParam
                }
                key={'param' + param.id}
                onClick={() => {
                  const isChosen = chosenList.find((item) => item.id === param.id)
                  if (isChosen) {
                    const editedChosens = chosenList.filter((item) => item.id !== param.id)
                    setChosenList(editedChosens)
                    return
                  }
                  setChosenList([...chosenList, param])
                }}>
                <div className={styles.filterParamImgWrap}>
                  {/*<img src={SERVER + param.imageUrl} alt={param.name}></img> */}
                </div>
                <p>{param.name}</p>
              </div>
            ))}
        </div>
        <div className={classNames(styles.btnsWrap, styles.btnsWrapRighted)}>
          <div className={classNames(styles.btnWrap, styles.btnWrapRighted)}>
            <ButtonNew
              title={'Выбрать'}
              type={ButtonNewTypes.Secondary}
              disabled={chosenList.length === 0}
              onClick={() => {
                dispatch(
                  setChosenFilters([
                    {
                      id: id,
                      name: title,
                      parameters: chosenList
                    }
                  ])
                )
                dispatch(
                  setReceivedFilters([
                    {
                      id: id,
                      name: title,
                      parameters: chosenList
                    }
                  ])
                )
                setChosenList([])
                closeModal()
              }}></ButtonNew>
          </div>
          <div className={classNames(styles.btnWrap, styles.btnWrapRighted)}>
            <ButtonNew
              title={'Отменить'}
              type={ButtonNewTypes.Primary}
              onClick={() => {
                setChosenList([])
                closeModal()
              }}></ButtonNew>
          </div>
        </div>
      </div>
    </div>
  )
}
