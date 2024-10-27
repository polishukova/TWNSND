import { createSlice } from '@reduxjs/toolkit'

import { responseStatus, responseStatusType } from '../../@types/types/responseStatus'

const getInitialState = (): { status: responseStatusType } => {
  return {
    status: responseStatus.IDLE
  }
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: getInitialState(),
  reducers: {
    sendContactsForm: (state, actions) => {},
    setContactsFormStatus: (state, actions) => {
      state.status = actions.payload
    }
  }
})

export const { sendContactsForm, setContactsFormStatus } = contactsSlice.actions

export default contactsSlice.reducer
