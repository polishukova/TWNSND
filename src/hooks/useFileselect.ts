import { useState, useEffect, ChangeEvent } from 'react'

export const useFileSelect = () => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const [preview, setPreview] = useState<string>()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onFileSelect = (e?: ChangeEvent<HTMLInputElement>) => {
    if (!e?.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      setPreview(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  return { onFileSelect, preview, selectedFile }
}
