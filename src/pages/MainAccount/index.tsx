import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { getFavoritesPlatfroms, getFavoritesPlatfromTemplates } from '../../redux/FavoritesCards/favoritesCardsSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import Loader from '../../components/UI/Loader'
import PlatformTemplateCard from '../../components/UI/PlatformTemplateCard'
import PlatformCard from '../../components/APP/PlatformCard'
import ButtonNew, { ButtonNewTypes } from '../../components/UI/ButtonNew'
import CreateCard from '../../components/UI/CreateCard'

import Request from '../../components/APP/Request'

import { PathNames } from '../Router/types'

import styles from './MainAccount.module.scss'

const MainAccount = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { favoritesPlatfroms, favoritesPlatfromTemplates } = useAppSelector((state) => state.favoritesCardsSlice)
  const { statusFavoritesPlatfroms, statusFavoritesPlatfromTemplates } = useAppSelector(
    (state) => state.statusFavoritesCardsSlice
  )

  useEffect(() => {
    dispatch(getFavoritesPlatfroms())
    dispatch(getFavoritesPlatfromTemplates())
  }, [dispatch])

  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 4,
        spacing: 25
      },

      breakpoints: {
        '(max-width: 1400px)': {
          slides: {
            perView: 3,
            spacing: 25
          }
        },
        '(max-width: 1170px)': {
          slides: {
            perView: 3,
            spacing: 20
          }
        },
        '(max-width: 1055px)': {
          slides: {
            perView: 2,
            spacing: 20
          }
        },
        '(max-width: 840px)': {
          slides: {
            perView: 3,
            spacing: 20
          }
        },
        '(max-width: 767px)': {
          slides: {
            perView: 2,
            spacing: 8
          }
        },
        '(max-width: 519px)': {
          slides: {
            perView: 1
          }
        }
      },
      loop: true
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  const [isActiveModal, toggleIsActiveModal] = useState(false)
  return (
    <>
      <>
        <AnimatePresence>
          {isActiveModal && (
            <Request
              closeModal={() => {
                toggleIsActiveModal(false)
              }}
              sourcePage="page: main account, type: request"
            />
          )}
        </AnimatePresence>
        <div className={styles.wrapper}>
          <div className={styles.application}>
            <h3 className={styles.title}>Оформить заявку</h3>
            <div className={styles.titleApplicationRow}>
              <h3 className={styles.description}>Здесь вы можете оставить заявку на создание уникального решения</h3>
              <ButtonNew
                title={'Оставить заявку'}
                type={ButtonNewTypes.Secondary}
                className={styles.applicationButton}
                onClick={() => {
                  toggleIsActiveModal(true)
                }}
              />
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>Избранные готовые решения</h3>
            </div>

            {statusFavoritesPlatfromTemplates === 'fullfilled' ? (
              favoritesPlatfromTemplates.length === 0 ? (
                <div className={styles.cardsWrapper}>
                  <CreateCard
                    title="Добавь готовое решение"
                    description="На экране появятся избранные готовые решения"
                    link={PathNames.Templates}
                  />
                </div>
              ) : (
                <div ref={ref} className="keen-slider">
                  {favoritesPlatfromTemplates.map((platformTemplate, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <PlatformTemplateCard
                        title={platformTemplate.name}
                        like={true}
                        // rating={platformTemplate.rating.toString()}
                        rating={'5'}
                        id={platformTemplate.id}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <Loader className={styles.loader} />
            )}
          </div>

          <div className={styles.container}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>Избранные платформы</h3>
            </div>
            {statusFavoritesPlatfroms === 'fullfilled' ? (
              favoritesPlatfroms.length === 0 ? (
                <div className={styles.cardsWrapper}>
                  <CreateCard
                    title="Добавь платформу"
                    description="На экране появятся избранные платформы"
                    link={PathNames.Platforms}
                  />
                </div>
              ) : (
                <div className={styles.cardsWrapper}>
                  {favoritesPlatfroms.map((favoritesPlatfrom, index) => (
                    <div key={index}>
                      <PlatformCard
                        onClick={() => navigate(`/platforms/${favoritesPlatfrom.id}`)}
                        platform={favoritesPlatfrom}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <Loader className={styles.loader} />
            )}
          </div>
        </div>
      </>
    </>
  )
}
export default MainAccount
