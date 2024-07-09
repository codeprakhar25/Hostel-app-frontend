'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://prakhar2004.pythonanywhere.com/'; // Replace with your backend URL

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
      query: (searchParam? : string, filterTerm? : string, sortTerm? :string) => `api/tenants/?search`
      ,
    }),
    getTenantById: builder.query({
      query: (id) => `api/tenants/${id}/`,
    }),
    getTenantByHostel: builder.query({
      query: (hostelId) => `api/tenants/by_hostel/?hostel_id=${hostelId}`,
      // transformResponse: (response: { results: any[] }) => response.results,
    }),

    // Get tenants by room
    getTenantByRoom: builder.query({
      query: (roomId) => `api/tenants/by_room/?room_id=${roomId}`,
      transformResponse: (response: { results: any[] }) => response.results,
    }),

    getPendingTenants: builder.query({
      query: (hostelId) => `api/tenants/due-date-passed-by-hostel/?hostel_id=${hostelId}`,
    }),

    // Get rents for a tenant
    getTenantRents: builder.query({
      query: (tenantId) => `api/tenants/${tenantId}/rents/`,
      transformResponse: (response: { results: any[] }) => response.results,
    }),

    // Get attachments for a tenant
    getTenantAttachments: builder.query({
      query: (tenantId) => `api/tenants/${tenantId}/attachments/`,
      transformResponse: (response: { results: any[] }) => response.results,
    }),

    // Get all rents
    getRents: builder.query({
      query: () => '/rents/',
      transformResponse: (response: { results: any[] }) => response.results,
    }),

    // Get all attachments
    getAttachments: builder.query({
      query: () => '/attachments/',
      transformResponse: (response: { results: any[] }) => response.results,
    }),
    createTenant: builder.mutation({
      query: (newTenant: any) => ({
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


    // Rent
    collectRent: builder.mutation({
      query: (data) => ({
        url: `api/rents/`,
        method: 'POST',
        body: data,
      }),
    }),

    // Hostel Endpoints
    getYourHostels: builder.query({
      query: () => `api/hostels/`,
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
    getHostelRooms: builder.query({
      query: (id: string) => `api/hostels/${id}/rooms/`,
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
  useGetTenantByHostelQuery,
  useGetTenantByRoomQuery,
  useGetTenantRentsQuery,
  useCollectRentMutation,
  useGetTenantAttachmentsQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useGetYourHostelsQuery,
  useGetHostelByIdQuery,
  useCreateHostelMutation,
  useGetHostelRoomsQuery,
  useUpdateHostelMutation,
  useGetPendingTenantsQuery,
  useDeleteHostelMutation,
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = apiSlice;
