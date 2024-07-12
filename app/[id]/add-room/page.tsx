'use client'
import { useParams } from "next/navigation";
import { useState } from 'react';
import { useCreateRoomMutation } from '@/api/apiSlice'; // Make sure to define this mutation in your apiSlice
import { Button, Card, Input, Select, Checkbox, Textarea, TextInput,NumberInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { Notification } from '@mantine/core';

export default function CheckInPage () {
  const {id}=useParams()
  const router = useRouter();
  const [addRoom, { isLoading, isSuccess, isError, error }] = useCreateRoomMutation();
  const [formValues, setFormValues] = useState({
    room_number: '',
    room_floor: 0,
    room_occupancy: 0,
    has_ac: false,
    has_attached_bathroom: false,
    extra_info: '',
    hostel: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleNumberChange = (value: any, name: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addRoom(formValues).unwrap();
      router.push(`/home`);
    } catch (error) {
      console.error('Failed to add room', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-6 bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Add Room</h2>
          <TextInput
            label="Room Number"
            name="room_number"
            value={formValues.room_number}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <NumberInput
            label="Room Floor"
            name="room_floor"
            value={formValues.room_floor}
            onChange={(value) => handleNumberChange(value, 'room_floor')}
            required
            className="mb-4"
          />
          <NumberInput
            label="Room Occupancy"
            name="room_occupancy"
            value={formValues.room_occupancy}
            onChange={(value) => handleNumberChange(value, 'room_occupancy')}
            required
            className="mb-4"
          />
          <Checkbox
            label="Has AC"
            name="has_ac"
            checked={formValues.has_ac}
            onChange={handleChange}
            className="mb-4"
          />
          <Checkbox
            label="Has Attached Bathroom"
            name="has_attached_bathroom"
            checked={formValues.has_attached_bathroom}
            onChange={handleChange}
            className="mb-4"
          />
          <Textarea
            label="Extra Info"
            name="extra_info"
            value={formValues.extra_info}
            onChange={handleChange}
            className="mb-4"
          />
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Room'}
          </Button>
          {isSuccess && (
            <Notification color="green" title="Success" onClose={() => {}}>
              Room added successfully!
            </Notification>
          )}
          {isError && (
            <Notification color="red" title="Error" onClose={() => {}}>
              {'Failed to add room.'}
            </Notification>
          )}
        </form>
      </Card>
    </div>
  );
};
