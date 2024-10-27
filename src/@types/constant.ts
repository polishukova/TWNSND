import { create } from 'apisauce'
export const ACCESS_TOKEN_KEY = 'accessToken1'
export const REFRESH_TOKEN_KEY = 'refreshToken1'
export const SERVER = 'https://dotnet.devlaba.online' //api
export const API = create({
  baseURL: 'https://dotnet.devlaba.online' //identity
})
export const API_GOOGLE = create({
  baseURL: 'https://dotnet.devlaba.online'
})
export const API_VK = create({
  baseURL: 'https://dotnet.devlaba.online'
})
export const API_SERVER = create({
  baseURL: SERVER
})

export const TEST_SERVER = create({
  baseURL: 'https://dotnet.devlaba.online'
})

export const MY_URL = 'https://dotnet.devlaba.online'

//SignIn Google
export const redirectUriGoogle = MY_URL
export const stateGoogle = '1234567890'
export const googleId = '923826205735-l644r1ke16c87a4agdbs97ceqdmlesb6.apps.googleusercontent.com'
export const linkGoogle = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUriGoogle}/account/profile&client_id=${googleId}&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=${stateGoogle}`

//SignIn VK
export const VK_CLIENT_ID = '51874744'
export const VK_REDIRECT_URI = 'https://dotnet.devlaba.online'
export const VK_SCOPE = 'email'
export const VK_RESPONSE_TYPE = 'code'
export const VK_VERSION = '5.131'

// Ссылка для авторизации через VK
export const linkVK = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&redirect_uri=${VK_REDIRECT_URI}&scope=${VK_SCOPE}&response_type=${VK_RESPONSE_TYPE}&v=${VK_VERSION}`

// Ссылка для регистрации через VK
export const LinkRegVk = `https://dotnet.devlaba.online/External/Challenge?provider=Vkontakte
`

// Информация от Backend:
// Ветка Identity: VKLoginTestBranch
// 1. Регистрация (для занесения user в БД):

// https://dev-dotnet.devlaba.online/External/Challenge?provider=Vkontakte

// 2. Запрос кода авторизации/ В ответ должен прийти код, который вставляется в 3 запрос

// https://oauth.vk.com/authorize?client_id=51874744&redirect_uri=https://dev-dotnet.devlaba.online&scope=email&response_type=code&v=5.131

// 3. Запрос на получение токена от Identity Server, надо код из 2 запроса

// https://dev-dotnet.devlaba.online/connect/token?client_id=Test_js_client&scope=openid profile TownSend_Backend offline_access&grant_type=vk_auth&code=

// ent_id:Test_js_client
// scope:openid IdentityServerApi TownSend_Backend profile offline_access
// grant_type:vk_auth
// code:
// return_url:https://dev-dotnet.devlaba.online

// компонент FormLayout в нем ссылки для регистрации и входа
