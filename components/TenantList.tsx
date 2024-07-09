import { SetStateAction, useEffect, useState } from 'react'
import TenantCard from './TenantCard'
import { useGetPendingTenantsQuery, useGetTenantByHostelQuery, useGetTenantsQuery } from '@/api/apiSlice'
import Tabs from './Tabs'
import SearchBar from './SearchBar'
import { Loader, Button, Notification } from '@mantine/core'
import { Spinner } from './Spinner'
import { NoRecordsFound } from './NoRecordsFound'

const TenantList = ({ hostelId }: any) => {
  const { data: tenants, isLoading, error } = useGetTenantByHostelQuery(hostelId)
  const { data: pendingTenants, isLoading: pending, error: pendingError } = useGetPendingTenantsQuery(hostelId)
  const [filteredTenants, setFilteredTenants] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<string>('Rent pending')

  useEffect(() => {
    if (pendingTenants) {
      setFilteredTenants(pendingTenants)
    }
  }, [pendingTenants])

  const handleSearch = (query: string) => {
    const filtered = filteredTenants.filter((tenant: { name: string }) =>
      tenant.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredTenants(filtered)
  }

  const handleTabChange = (tab: SetStateAction<string>) => {
    setActiveTab(tab as string) // Type assertion since tab is SetStateAction<string>
    switch (tab) {
      case 'All':
        setFilteredTenants(tenants)
        break
      case 'Rent pending':
        setFilteredTenants(pendingTenants)
        break
      case 'Rent collected':
        const rentCollectedTenants = tenants.filter((tenant: any) => {
          return !pendingTenants.some((pendingTenant: any) => pendingTenant.id === tenant.id)
        })
        setFilteredTenants(rentCollectedTenants)
        break
      default:
        break
    }
  }

  if (isLoading || pending) {
    return <Spinner />
  }

  if (error || pendingError) {
    return (
      <Notification title="Error" color="red">
        There was an error fetching the tenants.
      </Notification>
    )
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-around p-1">
        <Button
          onClick={() => handleTabChange('Rent collected')}
          className={`${activeTab === 'Rent collected' ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          Rent collected
        </Button>
        <Button
          onClick={() => handleTabChange('Rent pending')}
          className={`${activeTab === 'Rent pending' ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          Rent pending
        </Button>
        <Button
          onClick={() => handleTabChange('All')}
          className={`${activeTab === 'All' ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
          All
        </Button>
      </div>
      {filteredTenants.length === 0 ? (
        <NoRecordsFound />
      ) : (
        filteredTenants.map((tenant) => <TenantCard key={tenant?.id} tenant={tenant} isPending={activeTab==='Rent pending'} />)
      )}
    </div>
  )
}

export default TenantList
