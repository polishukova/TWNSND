import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type initialStateType = {
  idTemplateCard: number
  toRemovePublished: boolean
  toPublish: boolean
  toArchive: boolean
}

const initialState: initialStateType = {
  idTemplateCard: 0,
  toRemovePublished: false,
  toPublish: false,
  toArchive: false
}

const stateModalWindows = createSlice({
  name: 'stateModalWindows',
  initialState,
  reducers: {
    idTemplateCard(state, actions: PayloadAction<number>) {
      state.idTemplateCard = actions.payload
    },
    removePublished(state) {
      state.toRemovePublished = !state.toRemovePublished
    },
    publish(state) {
      state.toPublish = !state.toPublish
    },
    archive(state) {
      state.toArchive = !state.toArchive
    }
  }
})

export default stateModalWindows.reducer
export const { idTemplateCard, removePublished, publish, archive } = stateModalWindows.actions

//Publish

// const initialState = {
//   toRemovePublished: false,
//   toPublish:false
// }

// const Remove_Published = 'Remove_Published'
// const Publish = 'Publish'

// export const toRemovePublishedCreator = ()=>({type:Remove_Published})
// export const toPublishCreator = ()=>({type:Publish})

// export const stateModalWindows = (state = initialState, action:any) => {
//   switch (action.type) {
//     case Remove_Published:
//       return { ...state, toRemovePublished: !state.toRemovePublished }
//     case Publish:
//       return {...state, toPublish:!state.toPublish}
//     default:
//       return state
//   }
// }
