import { TBook, TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllbooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args !== undefined) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/books",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBook[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getsingleBook: builder.query({
      query: (args) => {
        return {
          url: `/books/${args}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TBook>) => {
        return {
          data: response.data,
        };
      },
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "/admin/create-book",
        method: "POST",
        body: data,
      }),
    }),
    updateBookPrice: builder.mutation({
      query: ({ bookId, newPrice }) => ({
        url: `/admin/books/${bookId}`,
        method: "PATCH",
        body: { price: Number(newPrice) },
      }),
    }),
    updateBookStock: builder.mutation({
      query: ({ bookId, newStock }) => ({
        url: `/admin/books/${bookId}`,
        method: "PATCH",
        body: { stock: Number(newStock) },
      }),
    }),
    updateBookDescription: builder.mutation({
      query: ({ bookId, newDescription }) => ({
        url: `/admin/books/${bookId}`,
        method: "PATCH",
        body: { description: newDescription },
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/admin/book/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetAllbooksQuery,
  useGetsingleBookQuery,
  useUpdateBookPriceMutation,
  useUpdateBookStockMutation,
  useUpdateBookDescriptionMutation,
  useDeleteBookMutation,
} = productManagementApi;
