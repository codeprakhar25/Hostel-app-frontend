// components/TenantCard.tsx
import { Card, Text, Button, Image } from '@mantine/core';

interface TenantCardProps {
  tenant: {
    id: number;
    name: string;
    room: string;
    phone_number: string;
  };
}

const TenantCard = ({ tenant }: TenantCardProps) => {
  return (
    <Card className="flex items-center border p-2 rounded mb-2">
      {/* <Image src="path/to/image.jpg" alt="Tenant" width={40} height={40} radius="50%" className="mr-4" /> */}
      <div className="flex-1">
        <Text>{tenant.name}</Text>
        <Text size="sm">{tenant.room}</Text>
      </div>
      <Button className="border p-2 rounded-full">📞</Button>
    </Card>
  );
};

export default TenantCard;
