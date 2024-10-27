// @ts-nocheck
/* eslint-disable */
import Croppie from 'croppie/croppie'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_SIZE_ZOOM = 0.7625 // TODO: компонент, который использовался для обрезки фото
export const CroppieImg = (src, alt) => {
  const [zoom, setZoom] = useState(DEFAULT_SIZE_ZOOM)
  const avatar = useRef(null)
  const zoomIn = () => {
    setZoom(zoom + 0.1)
    const obj = avatar.get()
    console.log('🚀 ~ zoomIn ~ obj:', obj)
  }
  useEffect(() => {
    avatar.current = new Croppie(document.getElementById('item'), {
      viewport: { width: 265, height: 265, type: 'circle' },
      update: function (data) {
        console.log('it works')
      },
      enableOrientation: true
    })
  }, [])

  useEffect(() => {
    avatar.current.setZoom(zoom)
    avatar.current.rotate(90)
  }, [zoom])

  return <img id="item" alt={alt.alt} src={src.src} />
}
