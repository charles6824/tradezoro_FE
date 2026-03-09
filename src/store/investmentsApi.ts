import { api } from './api';
import { Investment } from '@/types/auth';

export const investmentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query<
      {
        success: boolean;
        count: number;
        total: number;
        page: number;
        pages: number;
        data: Investment[];
      },
      { status?: string; page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: '/investments',
        params,
      }),
      providesTags: ['Investment'],
    }),
    getInvestment: builder.query<
      { success: boolean; data: Investment },
      string
    >({
      query: (id) => `/investments/${id}`,
      providesTags: ['Investment'],
    }),
    createInvestment: builder.mutation<
      { success: boolean; message: string; data: Investment },
      { packageId: string; amount: number }
    >({
      query: (investmentData) => ({
        url: '/investments',
        method: 'POST',
        body: investmentData,
      }),
      invalidatesTags: ['Investment', 'User', 'Transaction'],
    }),
    getInvestmentStats: builder.query<
      {
        success: boolean;
        data: {
          totalInvestments: number;
          totalInvested: number;
          totalReturns: number;
          byStatus: any[];
        };
      },
      void
    >({
      query: () => '/investments/stats',
      providesTags: ['Investment'],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  useGetInvestmentQuery,
  useCreateInvestmentMutation,
  useGetInvestmentStatsQuery,
} = investmentsApi;