// components/Tabs.tsx
import { useState } from 'react';
import { Button } from '@mantine/core';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Rent collected');

  return (
    <div className="flex justify-around p-1">
      <Button
        onClick={() => setActiveTab('Rent collected')}
        className={`${activeTab === 'Rent collected' ? 'bg-green-500' : 'bg-gray-500'}`}
      >
        Rent collected
      </Button>
      <Button
        onClick={() => setActiveTab('Rent pending')}
        className={`${activeTab === 'Rent pending' ? 'bg-green-500' : 'bg-gray-500'}`}
      >
        Rent pending
      </Button>
      <Button
        onClick={() => setActiveTab('All')}
        className={`${activeTab === 'All' ? 'bg-green-500' : 'bg-gray-500'}`}
      >
        All
      </Button>
    </div>
  );
};

export default Tabs;
