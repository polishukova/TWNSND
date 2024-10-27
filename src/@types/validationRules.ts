export const validationRules = {
  passwordSignUp: {
    required: '* Это поле обязательно к заполнению',
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_.]{8,}$/,
      message:
        '* Пароль минимум 8 символов - латинские буквы, 1 заглавную букву, 1 спецсимвол (допустимые символы: @$!%*?&_) и 1 цифру'
    }
  },

  passwordSignIn: {
    required: '* Пароль не может быть пустым.',
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.*[A-Za-zА-Яа-я])[0-9а-яА-ЯёЁa-zA-Z!@#$%^&*_\.]{8,}/g,
      message:
        '* Пароль минимум 8 символов - латинские буквы, кириллические буквы, 1 спецсимвол (допустимые символы: !@#$%^&*_) и 1 цифру'
    }
  },
  firstName: {
    required: '* Это поле обязательно к заполнению',
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^([a-zA-Zа-яА-ЯёЁ\-]{2,25})+([- ]?[a-zA-Zа-яА-ЯёЁ\-]{1,25})*$/gm,
      message: '* Имя должно содержать минимум 2 буквы'
    }
  },

  lastName: {
    pattern: {
      // eslint-disable-next-line no-useless-escape
      value: /^([a-zA-Zа-яА-ЯёЁ\-]{2,25})+([- ]?[a-zA-Zа-яА-ЯёЁ\-]{1,25})*$/gm,
      message: '* Фамилия должна содержать минимум 2 буквы'
    }
  },

  tel: {
    required: '* Это поле обязательно к заполнению',
    pattern: {
      value: /[0-9-()+]{9,}/,
      message: '* Номер телефона должен содержать 11 и более цифр'
    }
  },

  comment: {
    maxLength: {
      value: 500,
      message: 'Длина комментария не должна превышать 500 символов'
    }
  },

  emailSignUp: {
    required: '* Это поле обязательно к заполнению',
    pattern: {
      // eslint-disable-next-line
      value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      message:
        '* Введенный адрес не должен содержать кириллицы, а также должен быть похож по написанию на электронный адрес *@*.*'
    }
  },
  emailSignIn: {
    required: '* Email не может быть пустым.',
    pattern: {
      // eslint-disable-next-line
      value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      message: ''
    }
  },

  passwordConfirmation: {
    required: 'Поле не может быть пустым'
  }
}

export const lasNameMessage = '* Фамилия должна содержать минимум 2 буквы'
