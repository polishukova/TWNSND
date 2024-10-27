import { createSlice } from '@reduxjs/toolkit'

import { responseStatus, responseStatusType } from '../../@types/types/responseStatus'

const getInitialState = (): { status: responseStatusType } => {
  return {
    status: responseStatus.IDLE
  }
}

const requestSlice = createSlice({
  name: 'request',
  initialState: getInitialState(),
  reducers: {
    sendRequest: (state, actions) => {},
    setRequestStatus: (state, actions) => {
      state.status = actions.payload
    }
  }
})

export const { sendRequest, setRequestStatus } = requestSlice.actions

export default requestSlice.reducer
