import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'

import { deleteFilterBack, deleteFilterUI } from '../../../../redux/AdminPlatformCreate/adminFiltersSlice'

import { FilterType, FiltersDataType, ParamersFiltersType } from '../../../../@types/types/platforms'

import { RoundTitle } from '../../../UI/RoundTitle/RoundTitle'

import Close from '../../../../assets/img/Close'

import { AddableSection } from '../AddableSection/AddableSection'

import { AddablePossibility } from './AddablePossibility/AddablePossibility'

import styles from './AdditionalSettings.module.scss'

type AddSettsProps = {
  isInEditMode?: boolean
}

export const AdditionalSettings = ({ isInEditMode }: AddSettsProps) => {
  const dispatch = useAppDispatch()

  const chosenFilters: FiltersDataType[] = useAppSelector((state) => {
    return state.adminFiltersSlice.chosenFiltersUI
  })

  const handleClose = (category: FiltersDataType, filter: FilterType, param: ParamersFiltersType) => {
    dispatch(
      deleteFilterUI({
        filterId: category.id,
        filterName: category.name,
        deleteData: {
          id: filter.id,
          name: filter.name,
          parameters: param
        }
      })
    )
    dispatch(deleteFilterBack(param))
  }
  return (
    <div className={styles.template__addSettings}>
      <RoundTitle text={'Как работает'} isInEditMode={isInEditMode} />
      <div className={styles.addSettings__section}>
        {chosenFilters.map((category) =>
          category.filters.map((filter, index) => (
            <div key={filter.name + index}>
              {index === 0 && <h4 className={styles.addSettings__title}>{category.name}</h4>}
              <AddableSection
                plusFirst
                title={filter.name}
                filterName={category.name}
                filterId={category.id}></AddableSection>
              <div className={styles.filterParamWrapper}>
                {filter.parameters.map((param) => (
                  <div className={styles.filterParam} key={param.name}>
                    <Close className={styles.filterClose} onClick={() => handleClose(category, filter, param)} />
                    <div className={styles.filterParamImgWrap}></div>
                    <p>{param.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <AddablePossibility title={'Настройки'} plusIncluded isInEditMode={isInEditMode} />
      <AddablePossibility title={'Базовые возможности'} isInEditMode={isInEditMode} />
      <AddablePossibility title={'Дополнительные возможности'} isInEditMode={isInEditMode} />
    </div>
  )
}
