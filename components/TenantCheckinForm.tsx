
import { useForm } from '@mantine/form';
import { Button, Group } from '@mantine/core';
import FormField from './FormField';
import { useState } from 'react';

const TenantCheckInForm = () => {
  const [electricityOn, setElectricityOn] = useState(false);
  const [assetsOn, setAssetsOn] = useState(false);

  const form = useForm({
    initialValues: {
      tenantName: '',
      contactNumber: '',
      documentNumber: '',
      guardianName: '',
      guardianContactNumber: '',
      rentAmount: '',
      roomNumber: '',
      bedNumber: '',
      depositAmount: '',
      electricityReading: '',
      electricityPPU: '',
      assetName: '',
      assetUnit: '',
    },
    validate: {
      tenantName: (value) => (value ? null : 'Tenant Name is required'),
      contactNumber: (value) => (value ? null : 'Contact Number is required'),
      rentAmount: (value) => (value ? null : 'Rent Amount is required'),
    },
  });

  const handleSubmit = (values: any) => {
    console.log('Form Submitted', values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <FormField label="Tenant Name" name="tenantName" type="text" placeholder="Enter Tenant Name" required error={form.errors.tenantName} />
      <FormField label="Contact Number" name="contactNumber" type="text" placeholder="Enter Contact Number" required error={form.errors.contactNumber} />
      <FormField label="Document Number" name="documentNumber" type="text" placeholder="Enter Document Number" />
      <FormField label="Guardian Name" name="guardianName" type="text" placeholder="Enter Guardian Name" />
      <FormField label="Guardian Contact Number" name="guardianContactNumber" type="text" placeholder="Enter Guardian Contact Number" />
      <FormField label="Rent Amount" name="rentAmount" type="text" placeholder="Enter Rent Amount" required error={form.errors.rentAmount} />
      <FormField label="Room Number" name="roomNumber" type="text" placeholder="Enter Room Number" />
      <FormField label="Bed Number" name="bedNumber" type="text" placeholder="Enter Bed Number" />
      <FormField label="Deposit Amount" name="depositAmount" type="text" placeholder="Enter Deposit Amount" />

      <div className="flex items-center justify-between my-4">
        <FormField label="Electricity" name="electricity" type="switch" placeholder="" />
        <Button className={`bg-${electricityOn ? 'blue' : 'gray'}-500 text-white`} onClick={() => setElectricityOn(!electricityOn)}>
          Add Electricity
        </Button>
      </div>

      {electricityOn && (
        <>
          <FormField label="Current Reading" name="electricityReading" type="text" placeholder="Enter Current Reading" />
          <FormField label="PPU" name="electricityPPU" type="text" placeholder="Enter PPU" />
        </>
      )}

      <div className="flex items-center justify-between my-4">
        <FormField label="Assets" name="assets" type="switch" placeholder="" />
        <Button className={`bg-${assetsOn ? 'blue' : 'gray'}-500 text-white`} onClick={() => setAssetsOn(!assetsOn)}>
          Add Assets
        </Button>
      </div>

      {assetsOn && (
        <>
          <FormField label="Asset Name" name="assetName" type="text" placeholder="Enter Asset Name" />
          <FormField label="Asset Unit" name="assetUnit" type="text" placeholder="Enter Asset Unit" />
        </>
      )}

      <Group position="center">
        <Button type="submit" className="bg-green-500 text-white">
          CHECK IN
        </Button>
      </Group>
    </form>
  );
};

export default TenantCheckInForm;
