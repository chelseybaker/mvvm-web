import Weather from "../../models/Weather";
import WeatherStorable from "../../stores/WeatherStorable";
import MockWeather from "./MockWeather";

class MockWeatherStore implements WeatherStorable {
  currentLocationWeather?: Weather;

  getWeatherForLocation(longitude: number, latitude: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return Promise.resolve(MockWeather);
  }
}

export default MockWeatherStore;
