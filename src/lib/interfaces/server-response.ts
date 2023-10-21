export type ServerResponse<T> = ServerSuccessResponse<T> | ServerFailureResponse;

export interface ServerBaseResponse {
  success: boolean;
  message: string;
}

export interface ServerSuccessResponse<T> extends ServerBaseResponse {
  success: true;
  payload: T;
}

export interface ServerFailureResponse extends ServerBaseResponse {
  success: false;
  payload?: any;
}
