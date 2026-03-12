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

export const referralsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserReferrals: builder.query<UserReferralData, void>({
      query: () => '/referrals',
      providesTags: ['Referrals'],
    }),
  }),
});

export const { useGetUserReferralsQuery } = referralsApi;
