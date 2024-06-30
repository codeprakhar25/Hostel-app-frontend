'use client'
import TenantCheckInForm from "../../components/TenantCheckinForm";

export default function CheckInPage () {
  return (
    <div className="p-4 bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Add Tenant</h1>
        <TenantCheckInForm />
      </div>
    </div>
  );
};
