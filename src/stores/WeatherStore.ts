import CurrentWeatherResponse from "../network/openWeather/CurrentWeatherResponse";
import OpenWeatherNetworkable, {NetworkResponse} from "../network/openWeather/OpenWeatherNetworkable";
import WeatherStorable from "./WeatherStorable";
import Weather from "../models/Weather";
import {action, makeObservable, observable, runInAction} from "mobx";

class WeatherStore implements WeatherStorable {
  @observable currentLocationWeather?: Weather;
  private readonly networker: OpenWeatherNetworkable;

  constructor(networker: OpenWeatherNetworkable) {
    makeObservable(this);
    this.networker = networker;
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return this.networker
      .getWeatherForZip(zipCode)
      .then((response) => Promise.resolve(this.transformWeatherResponse(response)));
  }

  getWeatherForLocation(longitude: number, latitude: number): Promise<void> {
    return this.networker
      .getWeatherForCoordinates(longitude, latitude)
      .then((response) => {
        this.updateCurrentWeatherLocation(this.transformWeatherResponse(response));
        return Promise.resolve();
      })
      .catch(() => Promise.reject(new Error("A network error occurred")));
  }

  @action private updateCurrentWeatherLocation(weather?: Weather): void {
    this.currentLocationWeather = weather;
  }

  private transformWeatherResponse(response: NetworkResponse<CurrentWeatherResponse>): Weather {
    const kelvin = response.data.main.temp;
    const celsius = Math.floor(kelvin - 273.15);
    return {
      temperature: celsius,
      city: response.data.name,
    };
  }
}

export default WeatherStore;
