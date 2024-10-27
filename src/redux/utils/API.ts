import { ACCESS_TOKEN_KEY, API, API_GOOGLE, API_SERVER, VK_CLIENT_ID, VK_SCOPE } from '../../@types/constant'

import { AdminType } from '../../@types/types/adminPanel/adminPanelPlatforms'
import {
  ChangePasswordData,
  ParamsUrlGoogle,
  ParamsUrlType,
  ParamsUrlVK,
  RestorePassword,
  RestorePasswordData,
  SentMailRegisterUser,
  SignInType,
  UserType
} from '../../@types/types/auth'

import { FeedbackPayload } from '../../@types/types/feedbackForm'
import {
  CreateReview,
  CreatePlatformType,
  GetFilteredPlatforms,
  GetPlatformReviews,
  GetPlatforms
} from '../../@types/types/platforms'
import { Request } from '../../@types/types/request'
import { GetTemplates, updatePlatformTemplateRequest } from '../../@types/types/templates'
import { ChangeUserData } from '../../@types/types/user'

const registerUserMail = ({ FirstName, Email, Password, ConfirmPassword, LastName, Country }: UserType) => {
  const body = JSON.stringify({
    FirstName,
    Email,
    Password,
    ConfirmPassword,
    LastName,
    Country
  })
  return API.post('account/Account/Register', body, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

const sentEmailRegisterUser = ({ UserId, Email, ReturnUrl }: SentMailRegisterUser) => {
  return API.post(
    'account/Account/SendConfirmationEmail',
    { Email, UserId, ReturnUrl },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

const activateUser = ({ userId, email, code }: ParamsUrlType) => {
  return API.post(
    'account/Account/ConfirmEmail',
    { userId, email, code },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

const signInUser = ({ email: USER_EMAIL, password: USER_PASSWORD }: SignInType) => {
  const body = `client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access IdentityServerApi&grant_type=password&username=${USER_EMAIL}&password=${USER_PASSWORD}`
  return API.post('/connect/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    }
  })
}

const registerUserGoogle = ({ code, redirectUriGoogle, localEmail, localPassword }: ParamsUrlGoogle) => {
  const body =
    !localEmail && !localPassword
      ? `client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access IdentityServerApi&grant_type=google_auth&code=${code}&return_url=${redirectUriGoogle}`
      : `client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access IdentityServerApi&grant_type=google_auth&code=${code}&return_url=${redirectUriGoogle}&localEmail=${localEmail}&localPassword=${localPassword}`
  return API_GOOGLE.post('/connect/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    }
  })
}

const registerUserVK = ({ code, redirectUriVK, localEmail, localPassword }: ParamsUrlVK) => {
  const vkAuthParams = `client_id=${VK_CLIENT_ID}&scope=${VK_SCOPE}&grant_type=vk_auth&code=${code}&redirect_uri=${redirectUriVK}`

  const body =
    !localEmail && !localPassword
      ? vkAuthParams
      : `${vkAuthParams}&localEmail=${localEmail}&localPassword=${localPassword}`
  const response = API.post('/connect/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    }
  })
  return response
}

const restorePassword = ({ Email, ReturnUrl }: RestorePassword) => {
  return API.post('account/Account/ForgotPassword', { Email, ReturnUrl })
}

const restoreChangePasswordUser = ({ Password, Email, Code, ConfirmPassword }: RestorePasswordData) => {
  return API.post(
    'account/Account/ResetPassword',
    { Email, Code, Password, ConfirmPassword },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

const changePasswordUser = ({ oldPassword, newPassword, newPasswordConfirmation }: ChangePasswordData) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  return API.put(
    '/api/User/ChangeUserPassword',
    {
      oldPassword,
      newPassword,
      newPasswordConfirmation
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

const getUserData = (accessToken: string) => {
  return API_SERVER.get(
    '/api/User/GetCustomer',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const verifyToken = (ACCESS_TOKEN: string) => {
  return API.get(
    'account/Account/CheckTokenExpiration',
    {},
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    }
  )
}

const getNewAccessToken = (refresh_token: string) => {
  const body = `grant_type=refresh_token&client_id=Test_js_client&refresh_token=${refresh_token}`
  return API.post('/connect/token', body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    }
  })
}

const changeUserData = (accessToken: string, { firstName, lastName, email }: ChangeUserData) => {
  return API_SERVER.put(
    '/api/User/ChangeUserInfo',
    {
      firstName,
      lastName,
      email
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

const getPlatforms = ({ skip, take, letter, byDescending, isShowUnpublised }: GetPlatforms) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  return API_SERVER.get(
    '/api/PlatformCard/GetFilteredPlatforms',
    {
      skip,
      take,
      byDescending,
      isShowUnpublised
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const getTemplates = (
  { parametersId, costFrom, costTo, skip, take, byDescending, isShowUnpublished }: GetTemplates,
  accessToken: string
) => {
  return API_SERVER.get(
    '/api/PlatformTemplate/GetFilteredTemplates',
    {
      parametersId,
      costFrom,
      costTo,
      skip,
      take,
      byDescending,
      isShowUnpublished
    },
    {
      headers: {
        Authorization: !!accessToken ? `Bearer ${accessToken}` : ''
      }
    }
  )
}

const getTemplateById = (templateId: number, getDetails: boolean, accessToken: string) => {
  return API_SERVER.get(
    `/api/PlatformTemplate/GetTemplateById?templateId=${templateId}&getDetails=${getDetails}`,
    {},
    {
      headers: {
        Authorization: !!accessToken ? `Bearer ${accessToken}` : '',
        accept: '*/*',
        'Access-Control-Allow-Origin': '*'
      }
    }
  )
}

const getFilteredPlatforms = ({ parametersId, costFrom, costTo, skip, take, byDescending }: GetFilteredPlatforms) => {
  return API_SERVER.get(`/api/PlatformCard/GetFilteredPlatforms?${parametersId}`, {
    costFrom,
    costTo,
    skip,
    take,
    byDescending
  })
}

const getPlatform = (id: string, accessToken: string, isShowUnpublised?: boolean) => {
  return API_SERVER.get(
    '/api/PlatformCard/GetById',
    {
      platformId: id,
      isShowUnpublised: isShowUnpublised ? isShowUnpublised : false
    },
    {
      headers: {
        Authorization: !!accessToken ? `Bearer ${accessToken}` : ''
      }
    }
  )
}

const editPlatform = (id: number, accessToken: string, platform: CreatePlatformType) => {
  const platformId = id
  return API_SERVER.put(
    `/api/PlatformCard/UpdatePlatformCard?platformId=${platformId}`,
    {
      name: platform.name,
      description: platform.description,
      fullDescription: platform.fullDescription,
      imageUrl: platform.imageUrl,
      fileName: platform.fileName,
      url: platform.url,
      parameters: platform.parameters,
      categories: platform.categories,
      platformTemplateId: platform.platformTemplateId,
      settingsDescription: platform.settingsDescription,
      basicFeaturesDescription: platform.basicFeaturesDescription,
      additionalFeaturesDescription: platform.additionalFeaturesDescription
    },
    {
      headers: {
        Authorization: !!accessToken ? `Bearer ${accessToken}` : '',
        'Content-Type': 'application/json',
        accept: '*/*',
        'Access-Control-Allow-Origin': '*'
      }
    }
  )
}

const postPlatform = (accessToken: string, platform: CreatePlatformType) => {
  return API_SERVER.post(
    '/api/PlatformCard/CreatePlatformCard',
    {
      name: platform.name,
      description: platform.description,
      fullDescription: platform.fullDescription,
      imageUrl: platform.imageUrl,
      fileName: platform.fileName,
      url: platform.url,
      parameters: platform.parameters,
      categories: platform.categories,
      platformTemplateId: platform.platformTemplateId,
      settingsDescription: platform.settingsDescription,
      basicFeaturesDescription: platform.basicFeaturesDescription,
      additionalFeaturesDescription: platform.additionalFeaturesDescription
    },
    {
      headers: {
        Authorization: !!accessToken ? `Bearer ${accessToken}` : '',
        'Content-Type': 'application/json',
        accept: '*/*',
        'Access-Control-Allow-Origin': '*'
      }
    }
  )
}

const postPlatformImage = (image: File) => {
  const imgData = new FormData()
  imgData.append('Image', image)
  return API_SERVER.post('api/Image/PostPlatformImage', imgData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const getSearchPlatforms = ({ name, skip, take, byDescending }: GetPlatforms) => {
  return API_SERVER.get('/api/PlatformCard/SearchByName', {
    name,
    skip,
    take,
    byDescending
  })
}

const getAllFiltersPlatforms = () => {
  return API_SERVER.get('/api/PlatformCard/GetAllFiltes')
}

const getNotifications = (accessToken: string) => {
  return API_SERVER.get(
    '/api/Notifications/GetUserNotifications',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const markAllNotificationsAsViewed = (accessToken: string) => {
  return API_SERVER.get(
    '/api/Notifications/MarkAllAsViewed',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const markNotificationAsViewedById = (accessToken: string, notificationId: number, type: number) => {
  return API_SERVER.get(
    '/api/Notifications/MarkAsViewedById',
    { notificationId, type },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const getPlatformReviews = ({ platformId, skip, take, byDescending }: GetPlatformReviews) => {
  return API_SERVER.get('/api/PlatformCard/GetPlatformReviews', {
    platformId,
    skip,
    take,
    byDescending
  })
}

const createPlatformReview = (accessToken: string, { platformId, text }: CreateReview) => {
  return API_SERVER.post(
    '/api/PlatformCard/CreateReview',
    { platformId, text },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const addPlatformToFavorites = (accessToken: string, platformId: number) => {
  return API_SERVER.put(
    `/api/PlatformCard/AddToFavorites?platformId=${platformId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}
const removePlatformFromFavorites = (accessToken: string, platformId: number) => {
  return API_SERVER.delete(
    '/api/PlatformCard/RemoveFromFavorites',
    { platformId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const deletePlatformToFavorites = (accessToken: string, platformId: number) => {
  return API_SERVER.delete(
    '/api/PlatformCard/DeletePlatformToFavorite',
    { platformId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const getViewedPlatfromTemplates = (accessToken: string) => {
  return API_SERVER.get(
    '/api/User/GetViewedPlatfromTemplates',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const getViewedPlatfroms = (accessToken: string) => {
  return API_SERVER.get(
    '/api/User/GetViewedPlatfroms',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const deleteViewedCards = (accessToken: string) => {
  return API_SERVER.delete(
    '/api/User/DeleteViewed',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const addTemplatestoFavourite = (accessToken: string, platformTemplateId: number) => {
  return API_SERVER.put(
    `api/PlatformTemplate/AddToFavorites?platformId=${platformTemplateId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const removeFavoriteTemplate = (accessToken: string, platformTemplateId: number) => {
  return API_SERVER.delete(
    `api/PlatformTemplate/RemoveFromFavorites?platformId=${platformTemplateId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const getFavoritesPlatfromTemplates = (accessToken: string) => {
  return API_SERVER.get(
    '/api/PlatformTemplate/GetAllFavorite',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const getFavoritesPlatforms = (accessToken: string) => {
  return API_SERVER.get(
    '/api/PlatformCard/GetAllFavorites',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const sendRequest = (payload: Request) => {
  return API_SERVER.post('/api/AdminMail/SendContactForm', {
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName ?? null,
    phoneNumber: payload.tel,
    comment: payload.comment ?? null,
    sourcePage: payload.sourcePage
  })
}

const sendContactsForm = (payload: FeedbackPayload) => {
  return API_SERVER.post('/api/AdminMail/SendFeedbackForm', {
    email: payload.Email,
    name: payload.Name,
    phoneNumber: `+${payload.Phone}`,
    botLink: payload.Link
  })
}

const registerAdminMail = ({ firstName, lastName, email, password, role }: AdminType) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    role,
    returnUrl: ''
  })
  return API.post('/api/AdminSpecialist/CreateNewSpecialist', body, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}
const getModeratorsList = (accessToken: string) => {
  return API_SERVER.get(
    '/api/AdminSpecialist/GetModerators',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const getAdminsList = (accessToken: string) => {
  return API_SERVER.get(
    '/api/AdminSpecialist/GetAdministrators',
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const changeSpecialistState = (email: string, accessToken: string) => {
  return API_SERVER.put('/api/AdminSpecialist/ChangeSpecialistStatus', email, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

const setUpdatePlatformTemplate = ({ platformTemplateId, data }: updatePlatformTemplateRequest) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  const body = JSON.stringify(data)
  return API_SERVER.put(`/api/PlatformTemplate/UpdatePlatformTemplate?platformTemplateId=${platformTemplateId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const addTemplatesToArchive = (accessToken: string, platformTemplateId: number) => {
  return API_SERVER.get(
    `/api/PlatformTemplate/MoveToArchive?platformTemplateId=${platformTemplateId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}

const changeStatusTemplate = (platformTemplateId: number) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
  return API_SERVER.put(
    `/api/PlatformTemplate/PublishedPlatformTemplate?platformTemplateId=${platformTemplateId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export default {
  registerUserMail,
  sentEmailRegisterUser,
  activateUser,
  signInUser,
  getNewAccessToken,
  registerUserGoogle,
  registerUserVK,
  getUserData,
  restorePassword,
  restoreChangePasswordUser,
  changePasswordUser,
  verifyToken,
  changeUserData,
  getPlatforms,
  getTemplates,
  getSearchPlatforms,
  getNotifications,
  markAllNotificationsAsViewed,
  markNotificationAsViewedById,
  getPlatform,
  addTemplatestoFavourite,
  removeFavoriteTemplate,
  getFilteredPlatforms,
  editPlatform,
  postPlatform,
  postPlatformImage,
  getPlatformReviews,
  createPlatformReview,
  addPlatformToFavorites,
  removePlatformFromFavorites,
  deletePlatformToFavorites,
  getViewedPlatfromTemplates,
  getViewedPlatfroms,
  deleteViewedCards,
  getFavoritesPlatfromTemplates,
  getFavoritesPlatforms,
  sendRequest,
  getAllFiltersPlatforms,
  sendContactsForm,
  registerAdminMail,
  getModeratorsList,
  getAdminsList,
  changeSpecialistState,
  getTemplateById,
  setUpdatePlatformTemplate,
  addTemplatesToArchive,
  changeStatusTemplate
}
