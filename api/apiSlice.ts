'use client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://prakhar2004.pythonanywhere.com/'; // Replace with your backend URL

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
  tagTypes: ['Tenant', 'Hostel', 'Room', 'Rent', 'Attachment'],
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
      query: (searchParam?: string, filterTerm?: string, sortTerm?: string) => `api/tenants/?search`,
      providesTags: ['Tenant'],
    }),
    getTenantById: builder.query({
      query: (id) => `api/tenants/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Tenant', id }],
    }),
    getTenantByHostel: builder.query({
      query: (hostelId) => `api/tenants/by_hostel/?hostel_id=${hostelId}`,
      providesTags: ['Tenant'],
    }),
    getTenantByRoom: builder.query({
      query: (roomId) => `api/tenants/by_room/?room_id=${roomId}`,
      transformResponse: (response: { results: any[] }) => response.results,
      providesTags: ['Tenant'],
    }),
    getPendingTenants: builder.query({
      query: (hostelId) => `api/tenants/due-date-passed-by-hostel/?hostel_id=${hostelId}`,
      providesTags: ['Tenant'],
    }),
    getTenantRents: builder.query({
      query: (tenantId) => `api/tenants/${tenantId}/rents/`,
      transformResponse: (response: { results: any[] }) => response.results,
      providesTags: ['Rent'],
    }),
    getTenantAttachments: builder.query({
      query: (tenantId) => `api/tenants/${tenantId}/attachments/`,
      transformResponse: (response: { results: any[] }) => response.results,
      providesTags: ['Attachment'],
    }),
    getRents: builder.query({
      query: () => '/rents/',
      transformResponse: (response: { results: any[] }) => response.results,
      providesTags: ['Rent'],
    }),
    getAttachments: builder.query({
      query: () => '/attachments/',
      transformResponse: (response: { results: any[] }) => response.results,
      providesTags: ['Attachment'],
    }),
    createTenant: builder.mutation({
      query: (newTenant: any) => ({
        url: 'api/tenants/',
        method: 'POST',
        body: newTenant,
      }),
      invalidatesTags: ['Tenant'],
    }),
    updateTenant: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `api/tenants/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tenant', id }],
    }),
    deleteTenant: builder.mutation({
      query: (id: string) => ({
        url: `api/tenants/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Tenant', id }],
    }),

    // Rent Endpoints
    collectRent: builder.mutation({
      query: (data) => ({
        url: `api/rents/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Rent'],
    }),

    // Hostel Endpoints
    getYourHostels: builder.query({
      query: () => 'api/hostels/',
      providesTags: ['Hostel'],
    }),
    getHostelById: builder.query({
      query: (id: string) => `api/hostels/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Hostel', id }],
    }),
    createHostel: builder.mutation({
      query: (newHostel: { name: string; location: string; owner: string }) => ({
        url: 'api/hostels/',
        method: 'POST',
        body: newHostel,
      }),
      invalidatesTags: ['Hostel'],
    }),
    updateHostel: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `api/hostels/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Hostel', id }],
    }),
    deleteHostel: builder.mutation({
      query: (id: string) => ({
        url: `api/hostels/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Hostel', id }],
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
      providesTags: ['Room'],
    }),
    getRoomById: builder.query({
      query: (id: string) => `api/rooms/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Room', id }],
    }),
    createRoom: builder.mutation({
      query: (newRoom: any) => ({
        url: 'api/rooms/',
        method: 'POST',
        body: newRoom,
      }),
      invalidatesTags: ['Room'],
    }),
    updateRoom: builder.mutation({
      query: ({ id, data }: { id: string; data: Record<string, any> }) => ({
        url: `api/rooms/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Room', id }],
    }),
    getHostelRooms: builder.query({
      query: (id: string) => `api/hostels/${id}/rooms/`,
      providesTags: (result, error, id) => [{ type: 'Room', id }],
    }),
    deleteRoom: builder.mutation({
      query: (id: string) => ({
        url: `api/rooms/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Room', id }],
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
