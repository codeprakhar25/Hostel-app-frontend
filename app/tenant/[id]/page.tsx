'use client';

import { useState } from 'react';
import { Modal, Button, Notification } from '@mantine/core';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useGetRoomByIdQuery, useGetTenantByIdQuery } from '@/api/apiSlice';
import { Spinner } from '@/components/Spinner';

const TenantCard = () => {
  const { id } = useParams();
  const router=useRouter()
  const { data: tenantInfo, isLoading, error } = useGetTenantByIdQuery(id);
  const { data: roomInfo,error: roomerror } = useGetRoomByIdQuery(tenantInfo ? tenantInfo.room : '');
  const [opened, setOpened] = useState(false);
  const [vacated, setVacated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleVacate = () => {
    setVacated(true);
    setOpened(false);
  };

  const handleSeeDocument = () => {
    if (tenantInfo.attachments.length === 0) {
      setShowNotification(true);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-red-500">Error loading tenant information</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-md rounded p-4 m-4 w-80">
        <Image
          className="rounded-full mx-auto"
          src="/Man.svg"
          alt={tenantInfo.name}
          height={110}
          width={110}
          objectFit='contain'
        />
        <h2 className="text-center mt-2 font-bold text-lg">{tenantInfo.name}</h2>
        <p className="text-center">Room: {roomInfo?.room_number} • Floor: {roomInfo?.room_floor}</p>
        <p className="text-center text-xl font-semibold my-2">Amount: ₹{tenantInfo.rent_amount}</p>
        <div className="flex justify-around my-4">
          <Button variant="outline" onClick={handleSeeDocument}>See Document</Button>
          <Button variant="outline" onClick={() => window.location.href = `tel:${tenantInfo.phone_number}`}>Call Tenant</Button>
        </div>
        <p className="text-center text-gray-600">{tenantInfo?.address}</p>
        <p className="text-center text-gray-600">Ph: {tenantInfo.phone_number}</p>
        <div className="flex justify-around mt-4">
          <Button onClick={() => setOpened(true)} variant="filled">
            Vacate
          </Button>
          <Button variant="outline">Edit</Button>
          <Button variant="outline" onClick={()=>router.push(`/collect-rent/${id}`)}>Collect Rent</Button>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        title="Vacate Room?"
      >
        <div className="flex justify-around mt-4">
          <Button onClick={handleVacate} variant="filled">Yes</Button>
          <Button onClick={() => setOpened(false)} variant="outline">No</Button>
        </div>
      </Modal>
      {showNotification && (
        <div className="fixed bottom-4 right-4">
          <Notification
            color="blue"
            title="No attachments"
            onClose={() => setShowNotification(false)}
          >
            No documents are attached.
          </Notification>
        </div>
      )}
      {vacated && (
        <div className="bg-green-100 p-4 rounded mt-4 w-80 text-center">
          <p className="text-green-800 font-semibold">Room Vacated Successfully</p>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <TenantCard />
    </div>
  );
}
