import { useState, useCallback } from 'react'

type TModal = {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

export const useModal = (initialState: boolean = false): TModal => {
  const [isModalOpen, setIsModalOpen] = useState(initialState)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev)
  }, [])

  return {
    isModalOpen,
    openModal,
    closeModal,
    toggleModal
  }
}
