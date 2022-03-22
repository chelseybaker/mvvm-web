import {makeAutoObservable, runInAction} from "mobx";
import WeatherStorable from "../../stores/WeatherStorable";
import {convertCelsiusToFahrenheit} from "../../utilities/TemperatureConverter";

export interface GeoLocator {
  getCurrentPosition(success: (position: GeolocationPosition) => void, errorCallback?: PositionErrorCallback): void;
}

class CurrentLocationWeatherViewModel {
  private locationPermissionDenied?: boolean;
  private loading: boolean = false;

  private readonly weatherStore: WeatherStorable;
  private readonly geoLocator: GeoLocator;

  constructor(weatherStore: WeatherStorable, geoLocator: GeoLocator) {
    this.weatherStore = weatherStore;
    this.geoLocator = geoLocator;
    makeAutoObservable(this);
  }

  get locationTemperature(): string {
    if (this.loading) return "[Loading]";
    if (this.locationPermissionDenied) return "[Location permission denied]";

    const weather = this.weatherStore.currentLocationWeather;
    if (!weather) return "[Location weather not loaded]";

    const fahrenheit = convertCelsiusToFahrenheit(weather.temperature);
    return `It is ${fahrenheit}°F / ${weather.temperature}°C in ${weather.city}.`;
  }

  readonly getLocation = (): void => {
    if (this.locationPermissionDenied) return;
    this.loading = true;
    this.geoLocator.getCurrentPosition(
      (position) => {
        this.weatherStore
          .getWeatherForLocation(position.coords.longitude, position.coords.latitude)
          .finally(() => runInAction(() => (this.loading = false)));
      },
      () =>
        runInAction(() => {
          this.locationPermissionDenied = true;
          this.loading = false;
        })
    );
  };
}

export default CurrentLocationWeatherViewModel;
