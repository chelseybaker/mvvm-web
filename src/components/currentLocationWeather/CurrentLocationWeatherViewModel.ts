import {makeAutoObservable} from "mobx";
import WeatherStorable from "../../stores/WeatherStorable";
import {convertCelsiusToFahrenheit} from "../../utilities/TemperatureConverter";

export interface GeoLocator {
  getCurrentPosition(success: (position: GeolocationPosition) => void, errorCallback?: PositionErrorCallback): void;
}

class CurrentLocationWeatherViewModel {
  private locationPermissionDenied?: boolean;

  private readonly weatherStore: WeatherStorable;
  private readonly geoLocator: GeoLocator;

  constructor(weatherStore: WeatherStorable, geoLocator: GeoLocator) {
    this.weatherStore = weatherStore;
    this.geoLocator = geoLocator;
    makeAutoObservable(this);
  }

  get locationTemperature(): string {
    if (this.locationPermissionDenied) return "Location permission denied";

    const weather = this.weatherStore.currentLocationWeather;
    if (!weather) return "Location weather not loaded";

    const fahrenheit = convertCelsiusToFahrenheit(weather.temperature);
    return `It is ${fahrenheit}°F / ${weather.temperature}°C in ${weather.city}.`;
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

export default CurrentLocationWeatherViewModel;
