import { api } from './api';

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChatMessages: builder.query<
      { success: boolean; data: any[] },
      string | void
    >({
      query: (userId) => ({
        url: '/chat',
        params: userId ? { userId } : undefined,
      }),
      providesTags: ['Chat'],
    }),
    sendMessage: builder.mutation<
      { success: boolean; data: any },
      { message: string; userId?: string }
    >({
      query: (data) => ({
        url: '/chat',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
    getAllUserChats: builder.query<
      { success: boolean; data: any[] },
      void
    >({
      query: () => '/chat/users',
      providesTags: ['Chat'],
    }),
    markAsRead: builder.mutation<
      { success: boolean; message: string },
      { userId?: string }
    >({
      query: (data) => ({
        url: '/chat/read',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
});

export const {
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useGetAllUserChatsQuery,
  useMarkAsReadMutation,
} = chatApi;