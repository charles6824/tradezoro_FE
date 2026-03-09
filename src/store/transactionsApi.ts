import { api } from './api';
import { Transaction } from '@/types/auth';

export const transactionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<
      {
        success: boolean;
        count: number;
        total: number;
        page: number;
        pages: number;
        data: Transaction[];
      },
      { type?: string; status?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: '/transactions',
        params,
      }),
      providesTags: ['Transaction'],
    }),
    getTransaction: builder.query<
      { success: boolean; data: Transaction },
      string
    >({
      query: (id) => `/transactions/${id}`,
      providesTags: ['Transaction'],
    }),
    createDeposit: builder.mutation<
      { success: boolean; message: string; data: Transaction },
      {
        amount: number;
        method: string;
        reference?: string;
        walletAddress?: string;
      }
    >({
      query: (depositData) => ({
        url: '/transactions/deposit',
        method: 'POST',
        body: depositData,
      }),
      invalidatesTags: ['Transaction'],
    }),
    createWithdrawal: builder.mutation<
      { success: boolean; message: string; data: Transaction },
      {
        amount: number;
        method: string;
        address?: string;
        walletAddress?: string;
      }
    >({
      query: (withdrawalData) => ({
        url: '/transactions/withdrawal',
        method: 'POST',
        body: withdrawalData,
      }),
      invalidatesTags: ['Transaction'],
    }),
    getTransactionStats: builder.query<
      {
        success: boolean;
        data: {
          totalDeposits: number;
          totalWithdrawals: number;
          byTypeAndStatus: any[];
        };
      },
      void
    >({
      query: () => '/transactions/stats',
      providesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useCreateDepositMutation,
  useCreateWithdrawalMutation,
  useGetTransactionStatsQuery,
} = transactionsApi;