export type TRequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'; 

export type TRequestError = {
  code?: string;
  message?: string;
}

export interface IRequest {
  status: TRequestStatus;
  error: TRequestError | null;
}

export interface IRequests {
  [key: string]: IRequest;
}
