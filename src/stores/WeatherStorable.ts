import Weather from "../models/Weather";

interface WeatherStorable {
  /** Observable, gets weather for a specific location and stores in the global state. */
  readonly locationWeather?: Weather;
  getWeatherForLocation(longitude: number, latitude: number): Promise<void>;

  /** Returns the weather for a zip code. Does not store in the app. */
  getWeatherForZip(zipCode: string): Promise<Weather>;
}

export default WeatherStorable;
