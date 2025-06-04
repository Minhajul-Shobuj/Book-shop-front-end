import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    success: boolean;
    message: string;
    stack: string;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta: TMeta;
  message: string;
  success: boolean;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TBook = {
  _id: string;
  title: string;
  author: string;
  bookImg: string;
  publishedDate: Date;
  price: number;
  stock: number;
  description: string;
};

export type TCategory = {
  _id: string;
  title: string;
  subtitle: string;
  icon: string;
};
