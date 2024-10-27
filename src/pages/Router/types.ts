export enum PathNames {
  Home = '/',
  Main = '/main',
  Contacts = '/contacts',
  FAQ = '/faq',

  Account = '/account',
  MainAccount = '/account/main',
  TemplatesAccount = '/account/templates',
  TechTaskAccount = '/account/techTask',
  NewsAccount = '/account/news',
  Profile = '/account/profile',
  FaqAccount = '/account/faq',
  SettingsAccount = '/account/settings',
  LogOutAccount = '/account/logOut',
  SearchHistory = '/account/searchHistory',

  SignIn = '/signin',
  SignUp = '/signup',
  SuccessRegistration = '/success',
  CheckPasswordSocial = '/check-password-social',
  RestorePassword = ':slag/restore-passord',
  ChangePassword = '/recovery-passord-change',
  RestoreChangePassword = '/restore-passord-change',
  RegistrationConfirm = '/confirm-password',

  Platforms = '/platforms',
  PlatformDetails = '/platforms/:id',

  Templates = '/templates',
  TemplatesDetails = '/templates/:id',

  AdminPanelSpecialists = '/admin/specialists',
  AdminPanelAdministrators = '/admin/specialists/administrators',
  AdminPanelModerators = '/admin/specialists/moderators',

  AdminPanelPlatformCollection = '/admin/platforms/platform-collection',
  AdminPanelPlatformsFilters = '/admin/platforms/filters',

  AdminPanelTemplatesDetails = '/admin/templates/details',
  AdminPanelTemplatesFilters = '/admin/templates/filters',

  AdminPanelMain = '/admin/main-page',
  AdminPanelPlatforms = '/admin/platforms',
  AdminPanelPlatformsCreate = 'admin/platforms/create',
  AdminPanelPlatformsEdit = 'admin/platforms/:id/edit',
  AdminPanelTemplates = '/admin/templates',
  AdminPanelTemplatesCreate = '/admin/templates/create',
  AdminPanelTemplatesEdit = 'admin/templates/:id/edit',
  AdminPanelFAQ = '/admin/faq',
  AdminPanelBlog = '/admin/blog',
  AdminPanelContacts = '/admin/contacts',
  AdminPanelSettings = '/admin/settings',
  AdminSignIn = '/admin/signin',

  NotFoundPage = '/*'
}
