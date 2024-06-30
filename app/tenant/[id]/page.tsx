'use client'

import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import Image from 'next/image';

const TenantCard = () => {
  const [opened, setOpened] = useState(false);
  const [vacated, setVacated] = useState(false);

  const handleVacate = () => {
    setVacated(true);
    setOpened(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white shadow-md rounded p-4 m-4 w-80">
        <Image
          className="w-24 h-24 rounded-full mx-auto"
          // src="/images/salman_khan.jpg"
          alt="Salman Khan"
        />
        <h2 className="text-center mt-2 font-bold text-lg">Salman Khan</h2>
        <p className="text-center">Room: 205 • Bed: 2</p>
        <p className="text-center text-xl font-semibold my-2">₹5000</p>
        <div className="flex justify-around my-4">
          <Button variant="outline">See Document</Button>
          <Button variant="outline">Call Tenant</Button>
        </div>
        <p className="text-center text-gray-600">Allen career institute</p>
        <p className="text-center text-gray-600">has a rich dad, ph: +91 xxx-xxxx-xxx</p>
        <div className="flex justify-around mt-4">
          <Button onClick={() => setOpened(true)} variant="filled">
            Vacate
          </Button>
          <Button variant="outline">Edit</Button>
          <Button variant="outline">Collect Rent</Button>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Vacate Room?"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <div className="flex justify-around mt-4">
          <Button onClick={handleVacate} variant="filled">Yes</Button>
          <Button onClick={() => setOpened(false)} variant="outline">No</Button>
        </div>
      </Modal>
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
