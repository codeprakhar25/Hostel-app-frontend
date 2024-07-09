import { Loader } from '@mantine/core'
import React from 'react'

export const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
    <Loader size="lg" />
  </div>
  )
}
