// components/TenantList.tsx
import { useEffect, useState } from 'react';
import TenantCard from './TenantCard';
import { useGetTenantsQuery } from '@/api/apiSlice';
import Tabs from './Tabs';
import SearchBar from './SearchBar';
import { Loader } from '@mantine/core';

const TenantList = () => {
  const { data: tenants, isLoading } = useGetTenantsQuery();
  const [filteredTenants, setFilteredTenants] = useState([]);

  useEffect(() => {
    if (tenants) {
      setFilteredTenants(tenants);
    }
  }, [tenants]);

  const handleSearch = (query: string) => {
    const filtered = tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTenants(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Tabs />
      {isLoading ? (
        <Loader/>
      ) : (
        filteredTenants.map((tenant) => <TenantCard key={tenant.id} tenant={tenant} />)
      )}
    </div>
  );
};

export default TenantList;
