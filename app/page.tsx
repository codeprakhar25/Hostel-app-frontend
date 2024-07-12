'use client';

import { useEffect, useState } from 'react';
import { useGetHostelRoomsQuery, useGetPendingTenantsQuery, useGetTenantByHostelQuery, useGetYourHostelsQuery } from '@/api/apiSlice';
import { Button, Card, Select, Input, Text } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/Spinner';
import { IconCheck, IconSearchOff } from '@tabler/icons-react';
import { NoRecordsFound } from '@/components/NoRecordsFound';

interface Tenant {
  room: any;
  id: number;
  name: string;
  phone_number: string;
}

const TenantsPage = () => {
  const router = useRouter();
  const { data: hostels, isLoading: hostelsLoading, error: hostelsError } = useGetYourHostelsQuery(undefined);
  const [selectedHostel, setSelectedHostel] = useState<any>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: rooms, isLoading: isRoomsLoading, error: roomsError,isUninitialized } = useGetHostelRoomsQuery(selectedHostel, { skip: (selectedHostel.length <1) });
  const { data: tenants, isLoading: tenantsLoading, error: tenantsError } = useGetTenantByHostelQuery(selectedHostel, { skip: (selectedHostel.length <1) });
  const { data: pendingTenants, isLoading: pendingLoading, error: pendingError } = useGetPendingTenantsQuery(selectedHostel, { skip: (selectedHostel.length <1) });
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    if (hostels && hostels.length > 0 && !selectedHostel) {
      setSelectedHostel(hostels[0].id.toString());
    }
  }, [hostels, selectedHostel]);

  useEffect(() => {
    if (pendingTenants) {
      setFilteredTenants(pendingTenants);
    }
  }, [pendingTenants]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const filtered = pendingTenants?.filter((tenant: Tenant) =>
      tenant.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredTenants(filtered || []);
  };

  const getVacantRooms = () => {
    if (rooms && tenants) {
      const totalOccupancy = rooms.reduce((acc: any, room: { room_occupancy: any; }) => acc + room.room_occupancy, 0);
      const occupiedRooms = tenants.length;
      return totalOccupancy - occupiedRooms;
    }
    return 0;
  };

  const getTotalOccupancy = () => {
    if (rooms && tenants) {
      const totalOccupancy = rooms.reduce((acc: any, room: { room_occupancy: any; }) => acc + room.room_occupancy, 0);
      return totalOccupancy;
    }
    return 0;
  };

  if (hostelsLoading || (selectedHostel && (isRoomsLoading || tenantsLoading || pendingLoading))) {
    return <Spinner />;
  }

  if (hostelsError || (selectedHostel && (roomsError || tenantsError || pendingError))) {
    return <div>Error loading data</div>;
  }

  if (!hostels || hostels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <IconSearchOff className="w-24 h-24 text-gray-500" />
        <h2 className="text-3xl font-bold text-gray-700 mt-4">No hostels available</h2>
        <p className="text-gray-600 mt-2">Please contact support for assistance.</p>
        <Button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => router.push('/support')}>
          Contact Support
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <Select
          data={hostels.map((hostel: { id: { toString: () => any; }; name: any; }) => ({ value: hostel.id.toString(), label: `Hostel ${hostel.name}` }))}
          value={selectedHostel}
          placeholder='Select a Hostel'
          onChange={setSelectedHostel}
          classNames={{
            root: 'border rounded-md',
            input: 'p-2',
          }}
        />
        <Button className="border p-2 rounded-md" onClick={() => router.push('/support')}>Support</Button>
      </div>

      {/* Hostel Information */}
      {selectedHostel && rooms ? (
        <Card className="bg-green-100 p-4 rounded-md mb-4 flex flex-row justify-between items-center">
        <div>
          <Text className="text-lg font-bold">Hostel {hostels?.find((h: { id: { toString: () => string; }; }) => h.id.toString() === selectedHostel)?.name}</Text>
          <Text>{rooms.length} Rooms</Text>
        </div>
        <Button color='indigo' className="text-white py-1 px-4 rounded" onClick={() => router.push(`/${selectedHostel}/add-room`)}>Add Rooms</Button>
      </Card>
      ) : (
        <Text>Loading rooms...</Text>
      )}

      {/* Vacancy Information */}
      <div className="text-center mb-4">
        <Text className="text-2xl font-bold">
          {rooms && tenants ? `${getVacantRooms()} Vacant / ${getTotalOccupancy()}` : 'Loading...'}
        </Text>
        {selectedHostel && (
          <Button className="bg-blue-500 text-white py-2 px-4 rounded mt-2" onClick={() => router.push(`/${selectedHostel}/tenants`)}>See all tenants</Button>
        )}
      </div>

      {/* Rent Pending List */}
      <div className="mb-4">
        <Text className="font-bold mb-2">Rent Pending</Text>
        {pendingLoading ? (
          <Spinner />
        ) : (
          filteredTenants.length === 0 && searchQuery.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-8 p-4 border border-green-300 bg-green-50 rounded-md">
              <IconCheck className="w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-bold text-green-600 mt-4">Wohoo! No pending payments</h2>
              <p className="text-green-600 mt-2">All tenants are up-to-date with their payments.</p>
            </div>
          ) : filteredTenants.length === 0 && searchQuery.length !== 0 ? (
            <NoRecordsFound />
          ) : (
            filteredTenants.map((tenant) => (
              <Card key={tenant.id} className="flex-row cursor-pointer items-center border border-zinc-500 p-2 rounded mb-2" onClick={() => router.push(`/tenant/${tenant.id}`)}>
                <Image alt="Tenant" width={40} height={40} src="/Man.svg" className='mr-4' />
                <div className="flex-1">
                  <Text>{tenant?.name}</Text>
                  <Text size="sm">Room No. - {tenant?.room?.room_number}</Text>
                </div>
                <Button className="border p-2 rounded-full" onClick={() => window.location.href = `tel:${tenant.phone_number}`}>📞</Button>
              </Card>
            ))
          )
        )}
      </div>

      {/* Search and Add Tenant */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md">
        {selectedHostel && (
          <>
            <Input
              placeholder="Search Tenant"
              value={searchQuery}
              onChange={handleSearch}
              className="border p-2 rounded-md w-full mb-4"
            />
            <Button className="bg-blue-500 text-white py-2 px-4 rounded w-full" onClick={() => router.push(`/${selectedHostel}/checkin`)}>ADD TENANT</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TenantsPage;
