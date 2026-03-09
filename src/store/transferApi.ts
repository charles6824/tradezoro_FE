import { api } from './api';

export const transferApi = api.injectEndpoints({
  endpoints: (builder) => ({
    transferFunds: builder.mutation<
      { success: boolean; message: string; data: any },
      { recipientWalletId: string; amount: number; description?: string }
    >({
      query: (transferData) => ({
        url: '/transfers',
        method: 'POST',
        body: transferData,
      }),
      invalidatesTags: ['User', 'Transaction'],
    }),
    searchUserByWalletId: builder.query<
      { success: boolean; data: { name: string; walletId: string } },
      string
    >({
      query: (walletId) => `/transfers/search/${walletId}`,
    }),
  }),
});

export const {
  useTransferFundsMutation,
  useSearchUserByWalletIdQuery,
} = transferApi;