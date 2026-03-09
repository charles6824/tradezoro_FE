import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserBalance: builder.query<{ success: boolean; balance: number }, void>({
      query: () => '/users/balance',
      providesTags: ['User'],
    }),
    getUserProfile: builder.query<{ success: boolean; data: any }, void>({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserBalanceQuery,
  useGetUserProfileQuery,
} = userApi;