import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'

import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import {
  addPlatformRatingDesc,
  editPlatformRatingDesc,
  getPlatformReviews,
  setPlatformRating
} from '../../../../redux/AdminPlatformCreate/adminPlatformCreateSlice'

import { RoundTitle } from '../../../UI/RoundTitle/RoundTitle'
import ReviewCard from '../../../APP/ReviewCard'

import Star from '../../../../assets/img/Star'

import { RatingDescTextarea } from './RatingDescTextarea'

import styles from './Feedback.module.scss'

type FeedbackProps = {
  id?: number
  isInEditMode?: boolean
}

export const Feedback = ({ id, isInEditMode }: FeedbackProps) => {
  const [description, setDescription] = useState('')
  const ratingRef = useRef(null)
  const dispatch = useAppDispatch()
  const rating = useAppSelector((state) => state.adminPlatformCreateSlice.rating)
  const ratingDesc = useAppSelector((state) => state.adminPlatformCreateSlice.ratingDesc)

  useOnClickOutside(ratingRef, () => {
    if (description) {
      dispatch(addPlatformRatingDesc(description))
    }
    setDescription('')
  })

  useEffect(() => {
    getReviews()
  }, [dispatch, id])

  const getReviews = () => {
    if (!id) return

    dispatch(
      getPlatformReviews({
        data: {
          platformId: +id,
          skip: 0,
          take: 6,
          byDescending: false
        }
      })
    )
  }

  const changeRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex1 = new RegExp(/^(([0-5]((\.|,)([0-9]{0,1})?)?))$/)
    const length = e.target.value.length
    if (regex1.test(e.target.value)) {
      dispatch(setPlatformRating(Number(e.target.value)))
    } else {
      e.target.value = e.target.value.slice(0, length - 1)
    }
  }

  const platformReviews = useAppSelector((state) => state.adminPlatformCreateSlice.platformReviews)

  return (
    <>
      <div
        className={classNames(styles.template__feedback, {
          [styles.template__feedbackWithReviews]: platformReviews.length !== 0
        })}>
        <RoundTitle text={'Отзывы'}></RoundTitle>
        {/* <textarea
          placeholder={'Добавить описание'}
          ref={ratingRef}
          value={description}
          className={styles.feedback__descTextarea}
          onChange={(e) => setDescription(e.target.value)}></textarea>
        <div className={styles.ratingDescWrap}>
          {ratingDesc.map((desc, index) => (
            <RatingDescTextarea
              ratId={desc.id}
              key={desc.id}
              value={desc.title}
              placeholder={'Добавить описание'}
              name={desc.title[0] + '-' + id}
              textMaxLength={100}
              onChange={(e) => {
                dispatch(editPlatformRatingDesc({ id: index, title: e.currentTarget.value }))
              }}
            />
          ))}
        </div> */}
        <div className={styles.feedback__rating}>
          <Star />
          <input
            type={'number'}
            min={0}
            max={5}
            step={0.1}
            placeholder={'Добавить рейтинг'}
            value={rating}
            className={styles.feedback__ratingInput}
            onChange={changeRating}></input>
        </div>
      </div>
      {isInEditMode && platformReviews.length !== 0 && (
        <div className={styles.reviewsWrapper}>
          {platformReviews.map((review, index) => {
            return <ReviewCard review={review} key={index} page={0} index={index} isInEditMode />
          })}
        </div>
      )}
    </>
  )
}
