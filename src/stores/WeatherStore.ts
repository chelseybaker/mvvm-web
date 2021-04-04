import WeatherStoreInterface from "./WeatherStoreInterface";
import NetworkInterface from "../network/NetworkInterface";
import Weather from "../models/Weather";
import {action, makeObservable, observable} from "mobx";

class WeatherStore implements WeatherStoreInterface {
  currentWeather?: Weather;

  private readonly networker: NetworkInterface;
  constructor(networker: NetworkInterface) {
    this.networker = networker;
    makeObservable(this, {currentWeather: observable, getWeather: action});
  }

  getWeather(zipCode: string): Promise<void> {
    return this.networker.getWeather(zipCode).then((response) => {
      this.currentWeather = response.data;
      return Promise.resolve();
    });
  }
}

export default WeatherStore;
