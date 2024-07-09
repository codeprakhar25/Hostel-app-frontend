'use client'

import React from 'react'
import { Card, Text, Button, Image } from '@mantine/core'

const Support = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-6">
      <Card shadow="lg" radius="lg" className="w-full max-w-sm bg-white p-6">
        <div className="text-center mb-4">
          <Text className="text-gray-700 font-semibold text-lg">Call Support</Text>
        </div>
        <div className="flex justify-center mb-6">
          <Image
            src="./vector.svg"
            alt="Support Image"
            className="w-4/5 object-contain"
          />
        </div>
        <div className="text-center mb-6">
          <Text className="text-gray-600 font-medium">Contact us at:</Text>
          <Text className="text-black text-2xl font-bold">+91 66630 92566</Text>
        </div>
        <div className="flex justify-center">
          <Button
            fullWidth
            size="lg"
            radius="md"
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => window.open('tel:+916663092566')}
          >
            Call
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Support
