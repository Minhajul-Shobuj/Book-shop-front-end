import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    makeOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders/make-order",
        method: "POST",
        body: orderInfo,
      }),
    }),
    getMyOrders: builder.query({
      query: () => {
        return {
          url: "/orders/my-orders",
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

export const { useMakeOrderMutation, useGetMyOrdersQuery } = orderApi;
