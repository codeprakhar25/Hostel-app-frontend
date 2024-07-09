'use client'
import { useParams } from "next/navigation";
import TenantCheckInForm from "../../../components/TenantCheckinForm";
import '@mantine/dates/styles.css'

export default function CheckInPage () {
  const {id}=useParams()

  return (
    <div className="p-4 bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Add Tenant</h1>
        <TenantCheckInForm hostelId={id} />
      </div>
    </div>
  );
};
