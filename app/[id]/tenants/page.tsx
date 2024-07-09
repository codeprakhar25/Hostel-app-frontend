'use client'

import TenantList from "@/components/TenantList";
import { useParams } from "next/navigation";

export default function Tenant(){
  const {id}=useParams()
  return (
    
    <TenantList hostelId={id} />

  )
}