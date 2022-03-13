export enum LocalErrorCode {
  NetworkError = "NETWORK_ERROR",
  UnexpectedDataFormat = "UNEXPECTED_DATA_FORMAT",
}

export type LocalError = {
  code: LocalErrorCode;
  message: string;
};

export const NetworkError: LocalError = {
  code: LocalErrorCode.NetworkError,
  message: "An unknown network error occurred",
};

export const UnexpectedDataFormatError: LocalError = {
  code: LocalErrorCode.UnexpectedDataFormat,
  message: "Data is in an unexpected format",
};

export const isLocalError = (object: unknown): object is LocalError => {
  const error = object as LocalError;
  const localErrorCodes = Object.values(LocalErrorCode);
  return !!error && !!error.code && localErrorCodes.includes(error.code);
};
