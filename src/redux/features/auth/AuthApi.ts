import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/update-password",
        method: "POST",
        body: passwordData,
      }),
    }),
    subscribe: builder.mutation({
      query: (email) => ({
        url: "/subscribe",
        method: "POST",
        body: email,
      }),
    }),
    getMe: builder.query({
      query: () => {
        return {
          url: "/auth/me",
          method: "GET",
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useGetMeQuery,
  useSubscribeMutation,
} = authApi;
