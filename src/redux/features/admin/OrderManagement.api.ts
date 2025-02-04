import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/admin/orders/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin/orders",
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
  }),
});

export const { useUpdateOrderStatusMutation, useGetAllOrdersQuery } =
  orderManagementApi;
