import CurrentWeatherResponse from "./CurrentWeatherResponse";

export type NetworkResponse<T> = {
  data: T; // The data object we'd like to use
  status: number; // The status code of the response
};

export type NetworkPromise<T> = Promise<NetworkResponse<T>>;

interface OpenWeatherNetworkable {
  getWeatherForZip(params: {zip: string}): NetworkPromise<CurrentWeatherResponse>;
  getWeatherForCoordinates(params: {lon: number; lat: number}): NetworkPromise<CurrentWeatherResponse>;
}

export default OpenWeatherNetworkable;
