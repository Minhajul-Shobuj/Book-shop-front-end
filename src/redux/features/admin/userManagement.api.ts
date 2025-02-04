import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin/users",
          method: "GET",
          params: params,
        };
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    blockUser: builder.mutation({
      query: (args) => ({
        url: `/admin/users/${args.userId}/block`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation } = userManagementApi;
