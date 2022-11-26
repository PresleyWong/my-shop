import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (limit) => `products?limit=${limit}`,
    }),
    getProductDetail: builder.query({
      query: (productId) => `products/${productId}`,
    }),
    getProductSearch: builder.query({
      query: (keyword) => `products/search?q=${keyword}`,
    }),
    getProductByCategory: builder.query({
      query: (category) => `products/category/${category}`,
    }),
    getAllProductCategories: builder.query({
      query: () => "products/categories/",
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailQuery,
  useGetProductSearchQuery,
  useGetProductByCategoryQuery,
  useGetAllProductCategoriesQuery,
} = productApi;
