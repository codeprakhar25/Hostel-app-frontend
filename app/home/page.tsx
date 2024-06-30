'use client'

import { useEffect, useState } from 'react';
import { useGetTenantsQuery } from '@/api/apiSlice';
import { Button, Card, Select, Input, Image, Text, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface Tenant {
  id: number;
  name: string;
  room: string;
  phone_number: string;
}

const TenantsPage = () => {
  const { data: tenants, isLoading } = useGetTenantsQuery();
  const router = useRouter()
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (tenants) {
      setFilteredTenants(tenants);
    }
  }, [tenants]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filtered = tenants?.filter((tenant: Tenant) =>
      tenant.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredTenants(filtered || []);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <Select
          data={['Hostel 1', 'Hostel 2', 'Hostel 3']}
          placeholder="Select Hostel"
          classNames={{
            root: 'border rounded-md',
            input: 'p-2',
          }}
        />
        <Button className="border p-2 rounded-md">Support</Button>
      </div>

      {/* Hostel Information */}
      <Card className="bg-green-100 p-4 rounded-md mb-4">
        <Text weight={500} className="text-lg font-bold">Hostel ABC</Text>
        <Text>102 Rooms</Text>
      </Card>

      {/* Vacancy Information */}
      <div className="text-center mb-4">
        <Text className="text-2xl font-bold">17 Vacant / 120</Text>
        <Button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">See all tenants</Button>
      </div>

      {/* Rent Pending List */}
      <div className="mb-4">
        <Text weight={500} className="font-bold mb-2">Rent Pending</Text>
        {isLoading ? (
          <Loader/>
        ) : (
          filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="flex-row items-center border p-2 rounded mb-2">
              {/* <Image src="path/to/image.jpg" alt="Tenant" width={40} height={40} radius="50%" className="mr-4" /> */}
              <div className="flex-1">
                <Text>{tenant?.name}</Text>
                <Text size="sm">Room No. - {tenant?.room}</Text>
              </div>
              <Button className="border p-2 rounded-full">📞</Button>
            </Card>
          ))
        )}
      </div>

      {/* Search and Add Tenant */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md">
        <Input
          placeholder="Search Tenant"
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 rounded-md w-full mb-4"
        />
        <Button className="bg-blue-500 text-white py-2 px-4 rounded w-full" onClick={()=>{router.push('/checkin')}}>ADD TENANT</Button>
      </div>
    </div>
  );
};

export default TenantsPage;
