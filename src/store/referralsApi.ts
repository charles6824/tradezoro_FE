import { api } from './api';

export interface ReferredUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
}

export interface UserReferralData {
  success: boolean;
  referralCode: string;
  stats: {
    totalReferred: number;
    verifiedReferred: number;
  };
  referredUsers: ReferredUser[];
}

export interface AdminReferralUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  referralCode?: string;
  referredCount: number;
  createdAt: string;
}

export interface AdminReferralsResponse {
  success: boolean;
  data: AdminReferralUser[];
}

export const referralsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserReferrals: builder.query<UserReferralData, void>({
      query: () => '/referrals',
      providesTags: ['Referrals'],
    }),
    getAdminReferrals: builder.query<AdminReferralsResponse, void>({
      query: () => '/referrals/admin',
      providesTags: ['ReferralsAdmin'],
    }),
    updateAdminReferral: builder.mutation<{ success: boolean; data: AdminReferralUser }, { userId: string; referralCode: string }>({
      query: ({ userId, referralCode }) => ({
        url: `/referrals/admin/${userId}`,
        method: 'PUT',
        body: { referralCode },
      }),
      invalidatesTags: ['ReferralsAdmin'],
    }),
    deleteAdminReferral: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `/referrals/admin/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ReferralsAdmin'],
    }),
  }),
});

export const { 
  useGetUserReferralsQuery,
  useGetAdminReferralsQuery,
  useUpdateAdminReferralMutation,
  useDeleteAdminReferralMutation
} = referralsApi;
