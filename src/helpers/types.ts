export type Paging = {
  pageSize: number;
  pageNumber: number;
};

export type Option = {
  label: string;
  value: string;
};

export type Response<T> = {
  data: T[];
  total: number;
};
