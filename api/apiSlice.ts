'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://127.0.0.1:8000'; // Replace with your backend URL

const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
  endpoints: (builder) => ({
    // Authentication Endpoints
    loginUser: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    signupUser: builder.mutation({
      query: (userData: any) => ({
        url: '/signup/',
        method: 'POST',
        body: userData,
      }),
    }),

    // Tenant Endpoints
    getTenants: builder.query({
      query: () => `api/tenants/`
        // const searchParams = new URLSearchParams();
        // if (search) searchParams.append('search', search);
        // Object.keys(filter).forEach(key => searchParams.append(key, filter[key]));
        // if (sort) searchParams.append('ordering', sort);
        // return { url: `api/tenants/?${searchParams.toString()}`};
      ,
    }),
    getTenantById: builder.query({
      query: (id) => `api/tenants/${id}/`,
    }),
    getTenantsByHostel: builder.query({
      query: (hostelId) => `api/tenants/by-hostel/?hostel_id=${hostelId}`,
    }),
    getTenantsByRoom: builder.query({
      query: (roomId) => `api/tenants/by-room/?room_id=${roomId}`,
    }),
    getTenantRents: builder.query({
      query: (tenantId) => `api/tenants/${tenantId}/rents/`,
    }),
    getTenantAttachments: builder.query({
      query: (tenantId) => `api/tenants/${tenantId}/attachments/`,
    }),
    createTenant: builder.mutation({
      query: (newTenant: { name: string; contactNumber: string; documentNumber: string; guardianName: string; guardianContact: string; rent: number; roomNumber: string; bedNumber: string; deposit: number; electricityReading?: number; electricityPPU?: number; assetName?: string; assetUnit?: string }) => ({
        url: 'api/tenants/',
        method: 'POST',
        body: newTenant,
      }),
    }),
    updateTenant: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `api/tenants/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTenant: builder.mutation({
      query: (id: string) => ({
        url: `api/tenants/${id}/`,
        method: 'DELETE',
      }),
    }),

    // Hostel Endpoints
    getHostels: builder.query({
      query: ({ search = '', filter = {}, sort = '' }: { search?: string; filter?: Record<string, string>; sort?: string }) => {
        const searchParams = new URLSearchParams();
        if (search) searchParams.append('search', search);
        Object.keys(filter).forEach(key => searchParams.append(key, filter[key]));
        if (sort) searchParams.append('ordering', sort);
        return { url: `api/hostels/?${searchParams.toString()}` };
      },
    }),
    getHostelById: builder.query({
      query: (id: string) => `api/hostels/${id}/`,
    }),
    createHostel: builder.mutation({
      query: (newHostel: { name: string; location: string; owner: string }) => ({
        url: 'api/hostels/',
        method: 'POST',
        body: newHostel,
      }),
    }),
    updateHostel: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `api/hostels/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteHostel: builder.mutation({
      query: (id: string) => ({
        url: `api/hostels/${id}/`,
        method: 'DELETE',
      }),
    }),

    // Room Endpoints
    getRooms: builder.query({
      query: ({ search = '', filter = {}, sort = '' }: { search?: string; filter?: Record<string, string>; sort?: string }) => {
        const searchParams = new URLSearchParams();
        if (search) searchParams.append('search', search);
        Object.keys(filter).forEach(key => searchParams.append(key, filter[key]));
        if (sort) searchParams.append('ordering', sort);
        return { url: `api/rooms/?${searchParams.toString()}` };
      },
    }),
    getRoomById: builder.query({
      query: (id: string) => `api/rooms/${id}/`,
    }),
    createRoom: builder.mutation({
      query: (newRoom: { number: string; hostel: string; capacity: number }) => ({
        url: 'api/rooms/',
        method: 'POST',
        body: newRoom,
      }),
    }),
    updateRoom: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `api/rooms/${id}/`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteRoom: builder.mutation({
      query: (id: string) => ({
        url: `api/rooms/${id}/`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGetTenantsQuery,
  useGetTenantByIdQuery,
  useGetTenantsByHostelQuery,
  useGetTenantsByRoomQuery,
  useGetTenantRentsQuery,
  useGetTenantAttachmentsQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useGetHostelsQuery,
  useGetHostelByIdQuery,
  useCreateHostelMutation,
  useUpdateHostelMutation,
  useDeleteHostelMutation,
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = apiSlice;
