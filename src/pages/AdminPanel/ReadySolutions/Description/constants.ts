type TParameter = {
  id: number
  name: string
}

type TFilter = {
  id: number
  name: string
  parameters: TParameter[]
}

type TMockDescriptionArr = {
  id: number
  name: string
  filters: TFilter[]
}

export const mockDescriptionArr: TMockDescriptionArr[] = [
  {
    id: 1,
    name: 'Каналы',
    filters: [
      {
        id: 1,
        name: 'Мессенджеры',
        parameters: [
          {
            id: 1,
            name: 'Whatsapp (неофициальный)'
          },
          {
            id: 2,
            name: 'Whatsapp Business API'
          },
          {
            id: 3,
            name: 'Telegram'
          },
          {
            id: 4,
            name: 'Viber'
          },
          {
            id: 5,
            name: 'ВКонтакте'
          },
          {
            id: 6,
            name: 'Facebook Messenger'
          },
          {
            id: 7,
            name: 'Instagram'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Интеграции',
    filters: [
      {
        id: 2,
        name: 'CRM',
        parameters: [
          {
            id: 8,
            name: 'amoCRM'
          },
          {
            id: 9,
            name: 'Битрикс24'
          },
          {
            id: 10,
            name: 'RetailCRM'
          },
          {
            id: 11,
            name: '1C Битрикс'
          },
          {
            id: 12,
            name: 'YClients'
          },
          {
            id: 13,
            name: 'Мегаплан'
          }
        ]
      },
      {
        id: 3,
        name: 'Платежные системы',
        parameters: [
          {
            id: 14,
            name: 'ЮKassa'
          },
          {
            id: 15,
            name: 'Робокасса'
          },
          {
            id: 16,
            name: 'ЮMoney'
          },
          {
            id: 17,
            name: 'Prodamus'
          },
          {
            id: 18,
            name: 'Stripe'
          },
          {
            id: 19,
            name: 'Paypal'
          },
          {
            id: 20,
            name: 'Тинькофф'
          },
          {
            id: 21,
            name: 'Fondy'
          },
          {
            id: 22,
            name: 'Wayforpay'
          },
          {
            id: 23,
            name: 'Payonline'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Бизнес',
    filters: [
      {
        id: 4,
        name: 'Бизнес-модель',
        parameters: [
          {
            id: 24,
            name: 'B2C'
          },
          {
            id: 25,
            name: 'B2B'
          },
          {
            id: 26,
            name: 'B2B2C'
          }
        ]
      },
      {
        id: 5,
        name: 'Сфера бизнеса',
        parameters: [
          {
            id: 27,
            name: 'Онлайн-образование'
          },
          {
            id: 28,
            name: 'Диджитал-агенство'
          },
          {
            id: 29,
            name: 'Услуги для бизнеса'
          },
          {
            id: 30,
            name: 'Saas'
          },
          {
            id: 31,
            name: 'Интернет-магазин'
          },
          {
            id: 32,
            name: 'Медицина'
          }
        ]
      },
      {
        id: 6,
        name: 'Ниша бизнеса',
        parameters: [
          {
            id: 33,
            name: 'Языковые школы'
          },
          {
            id: 34,
            name: 'Маркетинговые услуги'
          },
          {
            id: 35,
            name: 'Бухгалтерские услуги'
          },
          {
            id: 36,
            name: 'ЭДО'
          },
          {
            id: 37,
            name: 'Одежда'
          },
          {
            id: 38,
            name: 'Детские товары'
          },
          {
            id: 39,
            name: 'Стоматология'
          },
          {
            id: 40,
            name: 'Клиника'
          }
        ]
      },
      {
        id: 7,
        name: 'Цели',
        parameters: [
          {
            id: 41,
            name: 'Увеличить конверсию в заявку'
          },
          {
            id: 42,
            name: 'Увеличить доходность'
          },
          {
            id: 43,
            name: 'Увеличить конверсию в оплату'
          },
          {
            id: 44,
            name: 'Сократить ручной труд'
          }
        ]
      },
      {
        id: 8,
        name: 'Типы решения',
        parameters: [
          {
            id: 45,
            name: 'Вебинарная воронка'
          },
          {
            id: 46,
            name: 'Сбор заявок'
          },
          {
            id: 47,
            name: 'Закрытый клуб'
          },
          {
            id: 48,
            name: 'Запись на услуги'
          }
        ]
      },
      {
        id: 9,
        name: 'Мессенджер-платформа',
        parameters: [
          {
            id: 49,
            name: 'Textback'
          },
          {
            id: 50,
            name: 'BotHelp'
          },
          {
            id: 51,
            name: 'Chat2Desk'
          },
          {
            id: 52,
            name: 'Salebot'
          }
        ]
      }
    ]
  }
]
