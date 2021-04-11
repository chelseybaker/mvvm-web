import CurrentWeatherResponse from "../network/openWeather/CurrentWeatherResponse";
import OpenWeatherNetworkable, {NetworkResponse} from "../network/OpenWeatherNetworkable";
import WeatherStorable from "./WeatherStorable";
import Weather from "../models/Weather";
import {makeAutoObservable} from "mobx";

class WeatherStore implements WeatherStorable {
  /** @observable */
  locationWeather?: Weather;
  private readonly networker: OpenWeatherNetworkable;

  constructor(networker: OpenWeatherNetworkable) {
    this.networker = networker;
    makeAutoObservable(this);
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return this.networker.getWeatherForZip(zipCode).then((response) => Promise.resolve(this.weatherReducer(response)));
  }

  /** @action */
  getWeatherForLocation(longitude: number, latitude: number): Promise<void> {
    return this.networker.getWeatherFoCoordinates(longitude, latitude).then((response) => {
      this.locationWeather = this.weatherReducer(response);
      return Promise.resolve();
    });
  }

  private weatherReducer = (response: NetworkResponse<CurrentWeatherResponse>): Weather => {
    const kelvin = response.data.main.temp;
    const fahrenheit = Math.floor(((kelvin - 273.15) * 9) / 5 + 32);
    const celsius = Math.floor(kelvin - 273.15);
    const weather: Weather = {
      temperature: {
        fahrenheit: fahrenheit,
        celsius: celsius,
      },
      city: response.data.name,
    };
    return weather;
  };
}

export default WeatherStore;
