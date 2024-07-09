'use client'

import { useForm } from '@mantine/form'
import { TextInput, PasswordInput, Button, Paper, Container, Center, Title } from '@mantine/core'
import { useLoginUserMutation } from '../../api/apiSlice'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginFormValues {
  username: string
  password: string
}

export default function LoginPage() {
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation()
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const response = await loginUser(values).unwrap()
      localStorage.setItem('token', response?.token?.access)
      router.push('/home')
    } catch (err) {
      console.error('Failed to login:', err)
    }
  }

  return (
    <Container className="flex bg-blue-50 flex-col items-center justify-center h-screen w-screen">
      <Paper className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Title mb="lg" className="text-xl font-bold">
          Login
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
          <TextInput
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps('username')}
            required
            className="w-full"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...form.getInputProps('password')}
            required
            className="w-full"
          />
          <Button type="submit" fullWidth className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" loading={isLoading}>
            Login
          </Button>
          {isError && <p className="text-red-500 mt-2 text-center">{(error as any)?.data?.detail}</p>}
        </form>
      </Paper>
    </Container>
  )
}