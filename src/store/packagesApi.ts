import { api } from './api';
import { InvestmentPackage } from '@/types/auth';

export const packagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPackages: builder.query<
      { success: boolean; count: number; data: InvestmentPackage[] },
      { active?: boolean } | void
    >({
      query: (params) => ({
        url: '/packages',
        params,
      }),
      providesTags: ['Package'],
    }),
    getPackage: builder.query<
      { success: boolean; data: InvestmentPackage },
      string
    >({
      query: (id) => `/packages/${id}`,
      providesTags: ['Package'],
    }),
    createPackage: builder.mutation<
      { success: boolean; message: string; data: InvestmentPackage },
      Omit<InvestmentPackage, 'id' | 'createdBy'>
    >({
      query: (packageData) => ({
        url: '/packages',
        method: 'POST',
        body: packageData,
      }),
      invalidatesTags: ['Package'],
    }),
    updatePackage: builder.mutation<
      { success: boolean; message: string; data: InvestmentPackage },
      { id: string; data: Partial<InvestmentPackage> }
    >({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Package'],
    }),
    deletePackage: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Package'],
    }),
    togglePackageStatus: builder.mutation<
      { success: boolean; message: string; data: InvestmentPackage },
      string
    >({
      query: (id) => ({
        url: `/packages/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Package'],
    }),
  }),
});

export const {
  useGetPackagesQuery,
  useGetPackageQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useTogglePackageStatusMutation,
} = packagesApi;