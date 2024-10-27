import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FiltersDataType, FilterType, ParamersFiltersType } from '../../@types/types/platforms'

type initialStateType = {
  allFilters: FiltersDataType[]
  chosenFiltersUI: FiltersDataType[]
  chosenFiltersBack: number[]
  statusGetFiltes: string
}

type DeletedFilter = {
  filterName: string
  filterId: number
  deleteData: { id: number; name: string; parameters: ParamersFiltersType }
}

const initialState: initialStateType = {
  allFilters: [],
  chosenFiltersUI: [],
  chosenFiltersBack: [],
  statusGetFiltes: ''
}

const adminFiltersSlice = createSlice({
  name: 'adminFiltersSlice',
  initialState,
  reducers: {
    getAllFilters: (state, actions: PayloadAction<boolean>) => {},
    setStatusGetFiltes: (state, actions: PayloadAction<string>) => {
      state.statusGetFiltes = actions.payload
    },
    setAllFilters: (state, actions: PayloadAction<FiltersDataType[]>) => {
      state.allFilters = actions.payload
    },
    setChosenFilters: (state, actions: PayloadAction<FilterType[]>) => {
      actions.payload.forEach((filter) => {
        filter.parameters.forEach((param) => {
          state.chosenFiltersBack = [...state.chosenFiltersBack, param.id]
        })

        /* const filterCurrent = state.chosenFiltersBack.find((item) => item.name === filter.name)
        const filterId = filterCurrent && state.chosenFiltersBack.indexOf(filterCurrent)
        if (!filterCurrent && !filterId) {
          state.chosenFiltersBack = [...state.chosenFiltersBack, ...actions.payload]
        } else if (filterId !== undefined) {
          const updatedFilters = [...state.chosenFiltersBack]
          updatedFilters.splice(filterId, 1, filter)
          state.chosenFiltersBack = updatedFilters
        } */
      })
    },
    deleteFilterUI: (state, actions: PayloadAction<DeletedFilter>) => {
      const alreadyExistCategory = state.chosenFiltersUI.find((filter) => filter.name === actions.payload.filterName)
      if (alreadyExistCategory) {
        const editingFilter = alreadyExistCategory.filters.find(
          (filter) => filter.name === actions.payload.deleteData.name
        )
        const filterIndex = editingFilter && alreadyExistCategory.filters.indexOf(editingFilter)
        const updatedFilters = [...alreadyExistCategory.filters]
        if (filterIndex !== -1 && filterIndex !== undefined && editingFilter) {
          const updatedParams = [...editingFilter.parameters]
          const param = updatedParams.find((param) => param.name === actions.payload.deleteData.parameters.name)
          const paramId = param && updatedParams.indexOf(param)
          paramId !== undefined && paramId !== -1 && updatedParams.splice(paramId, 1)
          const newCategory: FilterType = {
            id: actions.payload.deleteData.id,
            name: actions.payload.deleteData.name,
            parameters: updatedParams
          }
          updatedFilters.splice(filterIndex, 1, newCategory)
        }
        const filterId = state.chosenFiltersUI.indexOf(alreadyExistCategory)
        const newFilter: FiltersDataType = {
          id: actions.payload.filterId,
          name: actions.payload.filterName,
          filters: updatedFilters
        }
        const newArr = [...state.chosenFiltersUI]
        newArr.splice(filterId, 1, newFilter)
        state.chosenFiltersUI = newArr
      }
    },
    deleteFilterBack: (state, actions: PayloadAction<ParamersFiltersType>) => {
      const paramId = state.chosenFiltersBack.indexOf(actions.payload.id)
      const newArr = [...state.chosenFiltersBack]
      newArr.splice(paramId, 1)
      state.chosenFiltersBack = newArr
      /* const paramFilter = state.chosenFiltersBack.find((filter) =>
        filter.parameters.find((param) => param.name === actions.payload.name)
      )
      const filterIndex = paramFilter && state.chosenFiltersBack.indexOf(paramFilter)
      if (filterIndex !== undefined && filterIndex !== -1 && paramFilter) {
        const newParams = paramFilter.parameters.filter((param) => param.name !== actions.payload.name)
        const newFilter: FilterType = {
          id: paramFilter.id,
          name: paramFilter.name,
          parameters: newParams
        }
        const newArr = [...state.chosenFiltersBack]
        if (newFilter.parameters.length === 0) {
          newArr.splice(filterIndex, 1)
        } else {
          newArr.splice(filterIndex, 1, newFilter)
        }
        state.chosenFiltersBack = newArr 
      }*/
    },
    setReceivedFilters: (state, actions: PayloadAction<FilterType[]>) => {
      actions.payload.forEach((filter) => {
        const filterCategory = state.allFilters.find((category) =>
          category.filters.find((item) => item.name === filter.name)
        )
        const alreadyExistCategory = state.chosenFiltersUI.find((item) => item.name === filterCategory?.name)
        if (!alreadyExistCategory && filterCategory) {
          const newFilter: FiltersDataType = {
            id: filterCategory.id,
            name: filterCategory.name,
            filters: Array(filter)
          }
          state.chosenFiltersUI = [...state.chosenFiltersUI, newFilter]
        } else if (alreadyExistCategory && filterCategory) {
          const editingFilter = alreadyExistCategory.filters.find((item) => item.name === filter.name)
          const filterIndex = editingFilter && alreadyExistCategory.filters.indexOf(editingFilter)
          const updatedFilters = [...alreadyExistCategory.filters]

          if (filterIndex !== -1 && filterIndex !== undefined) {
            updatedFilters.splice(filterIndex, 1, filter)
          } else {
            updatedFilters.push(filter)
          }

          const filterId = state.chosenFiltersUI.indexOf(alreadyExistCategory)
          const newFilter: FiltersDataType = {
            id: filterCategory.id,
            name: filterCategory.name,
            filters: updatedFilters
          }
          const newArr = [...state.chosenFiltersUI]
          newArr.splice(filterId, 1, newFilter)
          state.chosenFiltersUI = newArr
        }
      })
    },
    resetAllFilters: () => initialState
  }
})

export const {
  getAllFilters,
  setAllFilters,
  setChosenFilters,
  deleteFilterUI,
  deleteFilterBack,
  setReceivedFilters,
  resetAllFilters,
  setStatusGetFiltes
} = adminFiltersSlice.actions
export default adminFiltersSlice.reducer
