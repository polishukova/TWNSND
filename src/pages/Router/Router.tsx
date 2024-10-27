/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Main from '../../components/APP/Main'
import Account from '../../layout/PersonalAccount'
import CheckPasswordSocial from '../CheckPasswordSocial'
import Contacts from '../Contacts'
import { FAQPage } from '../FAQ'
import FaqAccount from '../FaqAccount'
import Home from '../Home'
import LogOutAccount from '../LogOutAccount'
import MainAccount from '../MainAccount'
import NewsAccount from '../NewsAccount'
import PlatformDetails from '../PlatformDetails'
import Platforms from '../Platforms'
import Profile from '../Profile/Profile'
import RegistrationConfirm from '../RegistrationConfirm'
import RestoreChangePassword from '../RestoreChangePassword'
import RestorePassword from '../RestorePassword'
import SearchHistoryAccount from '../SearchHistoryAccount'
import SettingsAccount from '../SettingsAccount'
import SignUp from '../SignUp'
import SignIn from '../SingIn'
import SuccessRegistration from '../SuccessRegistration'
import TechTaskAccount from '../TechTaskAccount'
import Templates from '../Templates'
import TemplatesAccount from '../TemplatesAccount'
import TemplatesDetails from '../TemplatesDetails'

import SuperadminPlatforms from '../AdminPanel/Platforms/SuperadminPlatforms'
import { SuperadminSpecialists } from '../AdminPanel/Specialists/SuperadminSpecialists'

import AdminSignIn from '../AdminPanel/AdminSingIn'
import { SuperAdminAdministrators } from '../AdminPanel/AdministratorsAndModerators/SuperadminAdministrators'
import { SuperAdminModerators } from '../AdminPanel/AdministratorsAndModerators/SuperadminModerators'

import { CreatePlatformPanel } from '../AdminPanel/CreatePlatform/CreatePlatform'
import { PlatFormEditPanel } from '../AdminPanel/PlatformEditPanel/PlatformEditPanel'
import SuperadminPlatformCollection from '../AdminPanel/PlatformsAndFilters/SuperadminPlatformCollection'
import SuperadminPlatformsFilters from '../AdminPanel/PlatformsAndFilters/SuperadminPlatformsFilters'

import { SuperadminTemplates } from '../AdminPanel/Templates/SuperadminTemplates'
import { SuperadminTemplatesDetails } from '../AdminPanel/TemplatesAndFilters/SuperadminTemplatesDetails'
import { SuperadminTemplatesFilters } from '../AdminPanel/TemplatesAndFilters/SuperadminTemplatesFilters'
import { CreateTemplates } from '../AdminPanel/CreateTemplates/CreateTemplates'
import { TemplateEditPanel } from '../AdminPanel/TemplateEditPanel/TemplateEditPanel'

import { AdminPanelLayout } from '../../layout/AdminPanelLayout/AdminPanelLayout'
import NotFoundPage from '../NotFoundPage'

import { PathNames } from './types'

import PrivateRoutes from './PrivateRoutes'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<Home />}>
          <Route index element={<Main />} />
          <Route path={PathNames.Platforms} element={<Platforms />} />
          <Route path={PathNames.PlatformDetails} element={<PlatformDetails />} />
          <Route path={PathNames.Templates} element={<Templates />} />
          <Route path={PathNames.TemplatesDetails} element={<TemplatesDetails />} />
          <Route path={PathNames.Contacts} element={<Contacts />} />
          <Route path={PathNames.FAQ} element={<FAQPage />} />
        </Route>
        <Route path={PathNames.SignUp} element={<SignUp />} />
        <Route path={PathNames.SignIn} element={<SignIn />} />

        <Route element={<PrivateRoutes />}>
          <Route path={PathNames.Account} element={<Account />}>
            <Route path={PathNames.MainAccount} element={<MainAccount />} />
            <Route path={PathNames.TemplatesAccount} element={<TemplatesAccount />} />
            <Route path={PathNames.TechTaskAccount} element={<TechTaskAccount />} />
            <Route path={PathNames.NewsAccount} element={<NewsAccount />} />
            <Route path={PathNames.Profile} element={<Profile />} />
            <Route path={PathNames.FaqAccount} element={<FaqAccount />} />
            <Route path={PathNames.SettingsAccount} element={<SettingsAccount />} />
            <Route path={PathNames.LogOutAccount} element={<LogOutAccount />} />
            <Route path={PathNames.SearchHistory} element={<SearchHistoryAccount />} />
          </Route>
        </Route>

        {/* <Route element={<PrivateRoutes isAdmin />}> */}
        <Route element={<AdminPanelLayout />}>
          <Route path={PathNames.AdminPanelSpecialists} element={<SuperadminSpecialists />} />
          <Route path={PathNames.AdminPanelModerators} element={<SuperAdminModerators />} />
          <Route path={PathNames.AdminPanelAdministrators} element={<SuperAdminAdministrators />} />
          <Route path={PathNames.AdminPanelPlatformCollection} element={<SuperadminPlatformCollection />} />
          <Route path={PathNames.AdminPanelPlatformsFilters} element={<SuperadminPlatformsFilters />} />
          <Route path={PathNames.AdminPanelMain} />
          <Route path={PathNames.AdminPanelPlatforms} element={<SuperadminPlatforms />} />
          <Route path={PathNames.AdminPanelPlatformsCreate} element={<CreatePlatformPanel />} />
          <Route path={PathNames.AdminPanelPlatformsEdit} element={<PlatFormEditPanel />} />
          <Route path={PathNames.AdminPanelTemplates} element={<SuperadminTemplates />} />
          <Route path={PathNames.AdminPanelTemplatesDetails} element={<SuperadminTemplatesDetails />} />
          <Route path={PathNames.AdminPanelTemplatesFilters} element={<SuperadminTemplatesFilters />} />
          <Route path={PathNames.AdminPanelTemplatesCreate} element={<CreateTemplates />} />
          <Route path={PathNames.AdminPanelTemplatesEdit} element={<TemplateEditPanel />} />
          <Route path={PathNames.AdminPanelFAQ} />
          <Route path={PathNames.AdminPanelBlog} />
          <Route path={PathNames.AdminPanelContacts} />
          <Route path={PathNames.AdminPanelSettings} />
        </Route>
        {/* </Route> */}
        <Route path={PathNames.AdminSignIn} element={<AdminSignIn />} />
        <Route path={PathNames.SuccessRegistration} element={<SuccessRegistration />} />
        <Route path={PathNames.CheckPasswordSocial} element={<CheckPasswordSocial />} />
        <Route path={PathNames.RestorePassword} element={<RestorePassword />} />
        <Route path={PathNames.RegistrationConfirm} element={<RegistrationConfirm />} />
        <Route path={PathNames.RestoreChangePassword} element={<RestoreChangePassword />} />
        <Route path={PathNames.NotFoundPage} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
