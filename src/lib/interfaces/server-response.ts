export type ServerResponse<T> = ServerSuccessResponse<T> | ServerFailureResponse;

export interface ServerBaseResponse {
  success: boolean;
  message: string;
}

export interface ServerSuccessResponse<T> extends ServerBaseResponse {
  payload: T;
}

export interface ServerFailureResponse extends ServerBaseResponse {
  payload?: any;
}
