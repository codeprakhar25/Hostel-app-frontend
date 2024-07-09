// components/TenantCard.tsx
import { useGetRoomByIdQuery } from '@/api/apiSlice';
import Image from 'next/image';
import { Card, Text, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface TenantCardProps {
  isPending:Boolean,
  tenant: {
    room: any;
    id: number;
    name: string;
    phone_number: string;
    start_date: string;  // Assuming `start_date` is in string format for display purposes
    aadhar_number?: string | null;
    pan_number?: string | null;
    father_name?: string | null;
    father_phone_number?: string | null;
    mother_name?: string | null;
    mother_phone_number?: string | null;
    rent_amount: number;
    deposit_amount: number;
    next_due_date?: string | null;  // Assuming `next_due_date` is in string format for display purposes
    left_hostel: boolean;
    rent_frequency: string;  // Assuming `rent_frequency` is a string representing frequency (e.g., monthly, weekly)
    tenant_info?: string | null;
  };
}


const TenantCard = ({ tenant,isPending }: TenantCardProps) => {
  const router = useRouter()
  return (
    <Card className="flex cursor-pointer border-zinc-400 flex-row items-center border p-4 rounded m-4" onClick={()=>router.push(`/tenant/${tenant?.id}`)}>
      <Image alt="Tenant" width={50} height={50} src="/Man.svg" className='mr-4'/>
      <div className="flex-1">
        <Text>{tenant.name}</Text>
        <Text size="sm">Room No. - {tenant?.room?.room_number}, Floor {tenant?.room?.room_floor}</Text>
        {isPending && <div><Text size="sm">Due Date - {tenant.next_due_date}</Text>
        <Text size="sm">Amount - {tenant.rent_amount}</Text></div>}
      </div>
      <Button className="border p-2 rounded-full">📞</Button>
    </Card>
  );
};

export default TenantCard;
