'use client'

import { useState } from 'react';
import { TextInput, RadioGroup, Radio, Button, Notification } from '@mantine/core';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useGetTenantByIdQuery, useCollectRentMutation } from '@/api/apiSlice';
import { useParams, useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';
import '@mantine/dates/styles.css'
import { formatDate } from '@/utils/formatDate';

const CollectRent = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: tenantInfo, isLoading, error } = useGetTenantByIdQuery(id);
  const [collectRent] = useCollectRentMutation();

  const [rentDate, setRentDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [rentAmount, setRentAmount] = useState('');
  const [electricityAmount, setElectricityAmount] = useState('');
  const [waterAmount, setWaterAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  const handleCollectRent = async () => {
    if (!rentDate || !rentAmount || !electricityAmount || !waterAmount || !paymentMethod) {
      setNotificationMessage('Please fill in all required fields.');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    try {
      const result = await collectRent({
        tenant: id,
        amount: parseInt(rentAmount),
        date: formatDate(rentDate),
        rent_due_date: dueDate ? formatDate(dueDate) : null,
        electricity_amount: parseInt(electricityAmount),
        water_amount: parseInt(waterAmount),
        rent_remaining: 0,
      }).unwrap();

      setNotificationMessage('Rent collected successfully');
      setNotificationType('success');
      setShowNotification(true);
      router.back()
    } catch (err) {
      setNotificationMessage('Error collecting rent');
      setNotificationType('error');
      setShowNotification(true);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500">Error loading tenant information</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-96 border-2 border-purple-500">
        <div className="flex justify-between items-center mb-4">
          <button className="text-2xl" onClick={() => router.back()}>🔙</button>
          <h1 className="text-2xl font-bold text-purple-700">Collect Rent</h1>
        </div>
        <div className="mb-4">
          <DatePickerInput
            label="Select date"
            placeholder="Pick a date"
            value={rentDate}
            onChange={setRentDate}
            classNames={{
              label: 'text-black',
              input: 'border-black focus:border-purple-500',
            }}
          />
        </div>
        <div className="mb-4">
          <DatePickerInput
            label="Select Next Due date(optional)"
            placeholder="Pick a date"
            value={dueDate}
            onChange={setDueDate}
            classNames={{
              label: 'text-black',
              input: 'border-black focus:border-purple-500',
            }}
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Rent amount"
            placeholder="Enter Amount"
            value={rentAmount}
            onChange={(event) => setRentAmount(event.currentTarget.value)}
            classNames={{
              label: 'text-black',
              input: 'border-black focus:border-purple-500',
            }}
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Electricity amount"
            placeholder="Enter electricity amount"
            value={electricityAmount}
            onChange={(event) => setElectricityAmount(event.currentTarget.value)}
            classNames={{
              label: 'text-black',
              input: 'border-black focus:border-purple-500',
            }}
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Water amount"
            placeholder="Enter water amount"
            value={waterAmount}
            onChange={(event) => setWaterAmount(event.currentTarget.value)}
            classNames={{
              label: 'text-black',
              input: 'border-black focus:border-purple-500',
            }}
          />
        </div>
        <div className="mb-4">
          <RadioGroup
            label="Payment method"
            value={paymentMethod}
            onChange={setPaymentMethod}
            classNames={{
              label: 'text-black mb-2',
            }}
          >
            <Radio value="online" label="Online" />
            <Radio value="cash" label="Cash" />
          </RadioGroup>
        </div>
        {/* <div className="mb-4 text-right">
          <a href="#" className="text-black underline">Edit Rent Details</a>
        </div> */}
        <Button fullWidth className="bg-purple-700 hover:bg-purple-800" onClick={handleCollectRent}>
          Collect
        </Button>
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
      </div>
    </div>
  );
};

export default CollectRent;
