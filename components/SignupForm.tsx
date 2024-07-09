'use client'
import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Select, Alert, NumberInput } from '@mantine/core';
import { useSignupUserMutation } from '../api/apiSlice';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const form = useForm({
    initialValues: {
      username: '',
      name: '',
      city: '',
      role: 'user',
      contact_no: 0,
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 6 ? null : 'Password must be at least 7 characters'),
      contact_no: (value) => (/^\d+$/.test(value) ? null : 'Contact number must be digits only'),
    },
  });

  const [createUser] = useSignupUserMutation();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await createUser(values).unwrap();
      notifications.show({
        title: 'Signup Successful',
        message: 'Your account has been created successfully.',
        color: 'green',
      });
      router.push('/login')
    } catch (err: any) {
      setError(err.data?.message || 'Something went wrong. Please try again.');
      notifications.show({
        title: 'Something went wrong',
        message: 'Please try again later.',
        color: 'red',
      });
    }
  }

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-blue-50 p-6">
      <div className="w-4/5 bg-white shadow-lg rounded-lg p-8">
        <h2 className=" text-xxl font-semibold mb-6 text-center text-blue-700">Signup</h2>
        {error && <Alert color="red" className="mb-4">{error}</Alert>}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            {...form.getInputProps('name')}
            required
            className="mb-4"
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            {...form.getInputProps('username')}
            required
            className="mb-4"
          />
          <TextInput
            label="City"
            placeholder="Enter your city"
            {...form.getInputProps('city')}
            required
            className="mb-4"
          />
          <Select
            label="Role"
            data={[
              { value: 'user', label: 'User' },
              { value: 'hostelowner', label: 'Hostel Owner' },
              { value: 'warden', label: 'Warden' },
            ]}
            {...form.getInputProps('role')}
            className="mb-4"
          />
          <NumberInput
            label="Contact Number"
            placeholder="Enter your contact number"
            {...form.getInputProps('contact_no')}
            required
            className="mb-4"
          />
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps('email')}
            required
            className="mb-4"
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...form.getInputProps('password')}
            required
            className="mb-4"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2"
          >
            Signup
          </Button>
        </form>
      </div>
    </div>
  )
}
