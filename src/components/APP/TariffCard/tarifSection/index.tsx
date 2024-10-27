import { useEffect, useState } from 'react'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import classNames from 'classnames'

import { TariffCard } from '../index'
import { settings } from '../../../constants/constants'

import { useBreakpoint } from '../../../../hooks/useBreakpoint'

import styles from './TarifSection.module.scss'

export const TariffSection = () => {
  const MOBILE_WIDTH = 769
  const isBelowBreakpoint = useBreakpoint(MOBILE_WIDTH)

  const SliderContent = [
    <TariffCard title={'БАЗОВЫЙ ПЛАН'} price={10.99} additionalText={'Для консультирования клиентов онлайн'} />,
    <TariffCard title={'БИЗНЕС ПЛАН'} price={20.99} additionalText={'Для команд и отделов поддержки клиентов'} />,
    <TariffCard title={'PRO ПЛАН'} price={40.99} additionalText={'Для эффективной лидогенерации на сайте'} />
  ]

  return (
    <div className={styles.container}>
      <span className={styles.title}>Тарифы</span>

      {isBelowBreakpoint ? (
        <Slider {...settings}>
          {SliderContent.map((el) => {
            return <div className={classNames(styles.slide)}>{el}</div>
          })}
        </Slider>
      ) : (
        <div className={styles.tariffContainer}>
          {SliderContent.map((el) => {
            return <div>{el}</div>
          })}
        </div>
      )}
    </div>
  )
}
