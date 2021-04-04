import Weather from "../models/Weather";

export type NetworkResponse<T> = {
  data: T; // The data object we'd like to use
  status: number; // The status code of the response
};

export type NetworkPromise<T> = Promise<NetworkResponse<T>>;

interface NetworkInterface {
  getWeather(zipCode: string): NetworkPromise<Weather>;
}

export default NetworkInterface;
