import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { rootSaga } from './Sagas/rootSaga'
import signUpSlice from './SignUser/signUpSlice'
import statusSlice from './SignUser/statusSlice'
import signInSlice from './SignUser/signInSlice'
import adminSignInSlice from './AdminSign/adminSignInSlice'
import userSlice from './User/userSlice'
import contactsSlice from './Contacts/contactsSlice'
import platformsSlice from './Platforms/platformsSlice'
import statusPlatformsSlice from './Platforms/statusSlice'
import notificationsSlice from './Notifications/notificationsSlice'
import viewedCardsSlice from './ViewedCards/viewedCardsSlice'
import statusViewedCardsSlice from './ViewedCards/statusViewedCardsSlice'
import favoritesCardsSlice from './FavoritesCards/favoritesCardsSlice'
import statusFavoritesCardsSlice from './FavoritesCards/statusFavoritesCardsSlice'
import requestSlice from './Request/requestSlice'
import stateModalWindows from './StateModalWindows/StateModalWindows'
import adminPlatformCreateSlice from './AdminPlatformCreate/adminPlatformCreateSlice'
import adminFiltersSlice from './AdminPlatformCreate/adminFiltersSlice'
import adminSlice from './SuperAdmin/adminSlice'
import templatesSlice from './Templates/templatesSlice'
import adminTemplateCreateSlice from './AdminTemplatesCreate/adminTemplateCreateSlice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    signUpSlice,
    statusSlice,
    signInSlice,
    adminSignInSlice,
    userSlice,
    platformsSlice,
    templatesSlice,
    statusPlatformsSlice,
    notificationsSlice,
    viewedCardsSlice,
    statusViewedCardsSlice,
    favoritesCardsSlice,
    statusFavoritesCardsSlice,
    requestSlice,
    contactsSlice,
    stateModalWindows,
    adminPlatformCreateSlice,
    adminFiltersSlice,
    adminSlice,
    adminTemplateCreateSlice
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
