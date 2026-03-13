import { api } from './api';
import { User, Transaction, Investment } from '@/types/auth';

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<
      {
        success: boolean;
        data: {
          users: { total: number; active: number; newThisMonth: number };
          investments: { total: number; active: number; totalAmount: number };
          transactions: { pending: number; totalDeposits: number; totalWithdrawals: number };
          growth: { monthly: any[]; investments: any[] };
        };
      },
      void
    >({
      query: () => '/admin/dashboard',
      providesTags: ['Admin'],
    }),
    getUsers: builder.query<
      {
        success: boolean;
        count: number;
        total: number;
        page: number;
        pages: number;
        data: User[];
      },
      { page?: number; limit?: number; search?: string; status?: string } | void
    >({
      query: (params) => ({
        url: '/admin/users',
        params,
      }),
      providesTags: ['Admin', 'User'],
    }),
    updateUserStatus: builder.mutation<
      { success: boolean; message: string; data: User },
      { id: string; isActive: boolean }
    >({
      query: ({ id, isActive }) => ({
        url: `/admin/users/${id}/status`,
        method: 'PATCH',
        body: { isActive },
      }),
      invalidatesTags: ['Admin', 'User'],
    }),
    updateUserBalance: builder.mutation<
      { success: boolean; message: string; data: any },
      { id: string; amount: number; type: 'add' | 'subtract'; reason?: string; silent?: boolean }
    >({
      query: ({ id, ...data }) => ({
        url: `/admin/users/${id}/balance`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin', 'User', 'Transaction'],
    }),
    getAllTransactions: builder.query<
      {
        success: boolean;
        count: number;
        total: number;
        page: number;
        pages: number;
        data: Transaction[];
      },
      { page?: number; limit?: number; type?: string; status?: string } | void
    >({
      query: (params) => ({
        url: '/admin/transactions',
        params,
      }),
      providesTags: ['Admin', 'Transaction'],
    }),
    processTransaction: builder.mutation<
      { success: boolean; message: string; data: Transaction },
      { id: string; status: 'approved' | 'rejected'; adminNotes?: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/admin/transactions/${id}/process`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin', 'Transaction', 'User'],
    }),
    getAllInvestments: builder.query<
      {
        success: boolean;
        count: number;
        total: number;
        page: number;
        pages: number;
        data: Investment[];
      },
      { page?: number; limit?: number; status?: string } | void
    >({
      query: (params) => ({
        url: '/admin/investments',
        params,
      }),
      providesTags: ['Admin', 'Investment'],
    }),
    createPackage: builder.mutation<
      { success: boolean; message: string; data: any },
      { name: string; description: string; minAmount: number; maxAmount: number; duration: number; roi: number; features?: string[]; riskLevel?: string }
    >({
      query: (data) => ({
        url: '/admin/packages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin', 'Package'],
    }),
    updatePackage: builder.mutation<
      { success: boolean; message: string; data: any },
      { id: string; name?: string; description?: string; minAmount?: number; maxAmount?: number; duration?: number; roi?: number; features?: string[]; riskLevel?: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/admin/packages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Admin', 'Package'],
    }),
    deletePackage: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/admin/packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin', 'Package'],
    }),
    togglePackageStatus: builder.mutation<
      { success: boolean; message: string; data: any },
      string
    >({
      query: (id) => ({
        url: `/admin/packages/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Package'],
    }),
    deleteUser: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin', 'User'],
    }),
    completeInvestment: builder.mutation<
      { success: boolean; message: string; data: any },
      string
    >({
      query: (id) => ({
        url: `/admin/investments/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Investment', 'User'],
    }),
    activateInvestment: builder.mutation<
      { success: boolean; message: string; data: any },
      string
    >({
      query: (id) => ({
        url: `/admin/investments/${id}/activate`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Investment'],
    }),
    sendAdminMessage: builder.mutation<
      { success: boolean; message: string },
      { emails: string[]; subject: string; html: string }
    >({
      query: (data) => ({
        url: `/admin/messages`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserBalanceMutation,
  useGetAllTransactionsQuery,
  useProcessTransactionMutation,
  useGetAllInvestmentsQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useTogglePackageStatusMutation,
  useDeleteUserMutation,
  useCompleteInvestmentMutation,
  useActivateInvestmentMutation,
  useSendAdminMessageMutation,
} = adminApi;