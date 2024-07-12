'use client'

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Notification, NumberInput, Select, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useCreateTenantMutation, useGetHostelRoomsQuery } from '@/api/apiSlice';  // Adjust this import as per your API slice setup
import '@mantine/dates/styles.css';
import { formatDate } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';

const RENT_FREQUENCY_CHOICES = [
  'daily',
  'weekly',
  'fortnight',
  'monthly',
  'bimonthly',
  'quarterly',
  'half_yearly',
  'yearly',
];

const TenantCheckInForm = ({ hostelId }: any) => {
  const [electricityOn, setElectricityOn] = useState(false);
  const [assetsOn, setAssetsOn] = useState(false);
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');
  const { data: rooms, isLoading: isRoomsLoading, error: roomsError } = useGetHostelRoomsQuery(hostelId);
  const [createTenant, { isLoading }] = useCreateTenantMutation();
  const form = useForm({
    initialValues: {
      name: '',
      phone_number: null,
      aadhar_number: null,
      pan_number: null,
      father_name: '',
      father_phone_number: null,
      mother_name: '',
      mother_phone_number: null,
      rent_amount: null,
      deposit_amount: null,
      room: '',
      bed_number: null,
      electricity_reading: '',
      electricity_ppu: '',
      asset_name: '',
      hostel: hostelId,
      asset_unit: '',
      start_date: null,
      rent_frequency: '',
      next_due_date: null,
    },
    validate: {
      name: (value) => (value ? null : 'Name is required'),
      phone_number: (value) => (value ? null : 'Phone Number is required'),
      rent_amount: (value) => (value ? null : 'Rent Amount is required'),
      start_date: (value) => (value ? null : 'Start Date is required'),
      rent_frequency: (value) => (value ? null : 'Rent Frequency is required'),
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      await createTenant({
        ...values,
        hostel_id: hostelId,
        start_date: formatDate(values.start_date), // Convert to string for backend
        next_due_date: formatDate(values.next_due_date), // Convert to string for backend
      }).unwrap();

      setNotificationMessage('Tenant checked in successfully');
      setNotificationType('success');
      setShowNotification(true);

      // Reset form after successful submission
      form.reset();
      router.push(`/${hostelId}/tenants`);
    } catch (error) {
      setNotificationMessage('Error checking in tenant');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Name"
        name="name"
        type="text"
        placeholder="Enter Tenant Name"
        required
        error={form.errors.name}
        style={{ marginTop: 15 }}
        {...form.getInputProps('name')}
      />
      <NumberInput
        label="Phone Number"
        name="phone_number"
        placeholder="Enter Phone Number"
        required
        error={form.errors.phone_number}
        style={{ marginTop: 15 }}
        {...form.getInputProps('phone_number')}
      />
      <NumberInput
        label="Rent Amount"
        name="rent_amount"
        placeholder="Enter Rent Amount"
        required
        error={form.errors.rent_amount}
        style={{ marginTop: 15 }}
        {...form.getInputProps('rent_amount')}
      />
      <DatePickerInput
        placeholder="Pick a date"
        required
        label="Start Date"
        style={{ marginTop: 15 }}
        {...form.getInputProps('start_date')}
      />
      {form.errors.start_date && (
        <div className="text-red-500 text-sm mt-1">{form.errors.start_date}</div>
      )}
      <Select
        label="Rent Frequency"
        name="rent_frequency"
        placeholder="Select Rent Frequency"
        required
        error={form.errors.rent_frequency}
        data={RENT_FREQUENCY_CHOICES.map((value) => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ') }))}
        style={{ marginTop: 15 }}
        {...form.getInputProps('rent_frequency')}
      />
      <NumberInput
        label="Deposit Amount"
        required
        name="deposit_amount"
        placeholder="Enter Deposit Amount"
        style={{ marginTop: 15 }}
        {...form.getInputProps('deposit_amount')}
      />
      <Select
          data={rooms && rooms.map((hostel: { id: { toString: () => any; }; room_number: any; }) => ({ value: hostel.id.toString(), label: `Room ${hostel.room_number}` }))}
          label="Select Room"
          required
          placeholder='Select a Room'
          {...form.getInputProps('room')}
          classNames={{
            root: 'border rounded-md mt-4',
            input: 'p-2',
          }}
        />
<DatePickerInput
        placeholder="Pick a date"
        label="Next Due Date"
        required
        style={{ marginTop: 15 }}
        {...form.getInputProps('next_due_date')}
      />
      {form.errors.next_due_date && (
        <div className="text-red-500 text-sm mt-1">{form.errors.next_due_date}</div>
      )}
      <NumberInput
        label="Aadhar Number"
        name="aadhar_number"
        placeholder="Enter Aadhar Number"
        style={{ marginTop: 15 }}
        {...form.getInputProps('aadhar_number')}
      />
      <NumberInput
        label="PAN Number"
        name="pan_number"
        placeholder="Enter PAN Number"
        style={{ marginTop: 15 }}
        {...form.getInputProps('pan_number')}
      />
      <TextInput
        label="Father's Name"
        name="father_name"
        type="text"
        placeholder="Enter Father's Name"
        style={{ marginTop: 15 }}
        {...form.getInputProps('father_name')}
      />
      <NumberInput
        label="Father's Phone Number"
        name="father_phone_number"
        placeholder="Enter Father's Phone Number"
        style={{ marginTop: 15 }}
        {...form.getInputProps('father_phone_number')}
      />
      <TextInput
        label="Mother's Name"
        name="mother_name"
        type="text"
        placeholder="Enter Mother's Name"
        style={{ marginTop: 15 }}
        {...form.getInputProps('mother_name')}
      />
      <NumberInput
        label="Mother's Phone Number"
        name="mother_phone_number"
        placeholder="Enter Mother's Phone Number"
        style={{ marginTop: 15 }}
        {...form.getInputProps('mother_phone_number')}
      />
      <NumberInput
        label="Bed Number"
        name="bed_number"
        placeholder="Enter Bed Number"
        style={{ marginTop: 15 }}
        {...form.getInputProps('bed_number')}
      />
      
      <div className="flex items-center justify-between my-4">
        <Button className={`bg-${electricityOn ? 'blue' : 'gray'}-500 text-white`} onClick={() => setElectricityOn(!electricityOn)}>
          Add Electricity
        </Button>
      </div>
      {electricityOn && (
        <>
          <TextInput
            label="Current Reading"
            name="electricity_reading"
            type="text"
            placeholder="Enter Current Reading"
            style={{ marginTop: 15 }}
            {...form.getInputProps('electricity_reading')}
          />
          <TextInput
            label="PPU"
            name="electricity_ppu"
            type="text"
            placeholder="Enter PPU"
            style={{ marginTop: 15 }}
            {...form.getInputProps('electricity_ppu')}
          />
        </>
      )}
      <div className="flex items-center justify-between my-4">
        <Button className={`bg-${assetsOn ? 'blue' : 'gray'}-500 text-white`} onClick={() => setAssetsOn(!assetsOn)}>
          Add Assets
        </Button>
      </div>
      {assetsOn && (
        <>
          <TextInput
            label="Asset Name"
            name="asset_name"
            type="text"
            placeholder="Enter Asset Name"
            style={{ marginTop: 15 }}
            {...form.getInputProps('asset_name')}
          />
          <TextInput
            label="Asset Unit"
            name="asset_unit"
            type="text"
            placeholder="Enter Asset Unit"
            style={{ marginTop: 15 }}
            {...form.getInputProps('asset_unit')}
          />
        </>
      )}
      <Group align="center" w={'screen'}>
        <Button type="submit" className="bg-blue-500 text-white align-middle" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'CHECK IN'}
        </Button>
      </Group>
      {showNotification && (
        <div className="fixed bottom-4 right-4">
          <Notification
            color={notificationType === 'success' ? 'green' : 'red'}
            title={notificationType === 'success' ? 'Success' : 'Error'}
            onClose={() => setShowNotification(false)}
          >
            {notificationMessage}
          </Notification>
        </div>
      )}
    </form>
  );
};

export default TenantCheckInForm;
