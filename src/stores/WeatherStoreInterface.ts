import Weather from "../models/Weather";

interface WeatherStoreInterface {
  readonly currentWeather?: Weather;

  getWeather(zipCode: string): Promise<void>;
}

export default WeatherStoreInterface;
