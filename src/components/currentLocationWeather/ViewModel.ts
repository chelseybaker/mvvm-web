import {makeAutoObservable} from "mobx";
import WeatherStorable from "../../stores/WeatherStorable";

export interface GeoLocator {
  getCurrentPosition(success: (position: GeolocationPosition) => void, errorCallback?: PositionErrorCallback): void;
}

class ViewModel {
  private locationPermissionDenied?: boolean;

  private readonly weatherStore: WeatherStorable;
  private readonly geoLocator: GeoLocator;

  constructor(weatherStore: WeatherStorable, geoLocator: GeoLocator) {
    this.weatherStore = weatherStore;
    this.geoLocator = geoLocator;
    makeAutoObservable(this);
  }

  get locationTemperature(): string {
    const weather = this.weatherStore.locationWeather;
    return weather
      ? `It is ${weather.temperature.fahrenheit}°F / ${weather.temperature.celsius}°C in ${weather.city}.`
      : this.locationPermissionDenied
      ? "Location permission denied"
      : "Location weather not loaded";
  }

  getLocation = (): void => {
    this.geoLocator.getCurrentPosition(
      (position) => {
        this.weatherStore.getWeatherForLocation(position.coords.longitude, position.coords.latitude).finally();
      },
      () => (this.locationPermissionDenied = true)
    );
  };
}

export default ViewModel;
