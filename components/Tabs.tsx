// components/Tabs.tsx
import { useState } from 'react';
import { Button } from '@mantine/core';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Rent collected');

  return (
    <div className="flex justify-around p-4">
      <Button
        onClick={() => setActiveTab('Rent collected')}
        className={`${activeTab === 'Rent collected' ? 'bg-green-400' : ''}`}
      >
        Rent collected
      </Button>
      <Button
        onClick={() => setActiveTab('Rent pending')}
        className={`${activeTab === 'Rent pending' ? 'bg-blue-400' : ''}`}
      >
        Rent pending
      </Button>
    </div>
  );
};

export default Tabs;
