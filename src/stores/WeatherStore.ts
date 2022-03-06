import OpenWeatherDataTransformable from "../network/openWeather/OpenWeatherDataTransformable";
import WeatherStorable from "./WeatherStorable";
import Weather from "../models/Weather";
import {action, makeObservable, observable} from "mobx";

class WeatherStore implements WeatherStorable {
  @observable currentLocationWeather?: Weather;

  private readonly dataTransformer: OpenWeatherDataTransformable;

  constructor(dataTransformer: OpenWeatherDataTransformable) {
    makeObservable(this);
    this.dataTransformer = dataTransformer;
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return this.dataTransformer.getWeatherForZip(zipCode);
  }

  getWeatherForLocation(longitude: number, latitude: number): Promise<void> {
    return this.dataTransformer.getWeatherForCoordinates(longitude, latitude).then((weather) => {
      this.updateCurrentWeatherLocation(weather);
      return Promise.resolve();
    });
  }

  @action private updateCurrentWeatherLocation(weather?: Weather): void {
    this.currentLocationWeather = weather;
  }
}

export default WeatherStore;
