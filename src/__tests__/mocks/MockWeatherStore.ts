import Weather from "../../models/Weather";
import WeatherStorable from "../../stores/WeatherStorable";
import MockWeather from "./MockWeather";

class MockWeatherStore implements WeatherStorable {
  locationWeather?: Weather;

  getWeatherForLocationPromise = Promise.resolve(undefined);
  getWeatherForZipPromise = Promise.resolve(MockWeather);

  getWeatherForLocation(longitude: number, latitude: number): Promise<void> {
    return this.getWeatherForLocationPromise;
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return this.getWeatherForZipPromise;
  }
}

export default MockWeatherStore;
