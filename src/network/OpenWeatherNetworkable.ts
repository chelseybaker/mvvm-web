import CurrentWeatherResponse from "./openWeather/CurrentWeatherResponse";

export type NetworkResponse<T> = {
  data: T; // The data object we'd like to use
  status: number; // The status code of the response
};

export type NetworkPromise<T> = Promise<NetworkResponse<T>>;

interface OpenWeatherNetworkable {
  getWeatherForZip(zipCode: string): NetworkPromise<CurrentWeatherResponse>;
  getWeatherFoCoordinates(longitude: number, latitude: number): NetworkPromise<CurrentWeatherResponse>;
}

export default OpenWeatherNetworkable;
