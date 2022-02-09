import {action, computed, makeObservable, observable} from "mobx";
import Weather from "../../models/Weather";
import WeatherStorable from "../../stores/WeatherStorable";
import {convertCelsiusToFahrenheit} from "../../utilities/TemperatureConverter";

class ZipCodeWeatherViewModel {
  @observable temperatureLabel = "Enter a zip code: ";

  @observable private zipcode?: string;

  private readonly weatherStore: WeatherStorable;

  constructor(weatherStore: WeatherStorable) {
    makeObservable(this);
    this.weatherStore = weatherStore;
  }

  /** Based on the zipcode observable, whenever zipcode changes, this is recomputed */
  @computed get buttonDisabled(): boolean {
    return this.zipcode?.length !== 5;
  }

  /** Stores the typed zip code to the view model */
  @action readonly onChangeZipCode = (value: string): void => {
    this.zipcode = value;
  };

  /** Gets the weather for the current zip code */
  readonly onClickGetWeather = (): void => {
    if (!this.zipcode || this.zipcode.length !== 5) return;
    this.weatherStore
      .getWeatherForZip(this.zipcode)
      .then((weather) => this.updateTemperature(weather))
      .catch(() => this.updateTemperature(undefined));
  };

  /** Updates the temperatureLabel */
  @action private updateTemperature = (weather?: Weather): void => {
    if (!weather) {
      this.temperatureLabel = "Error getting temperature";
      return;
    }
    const fahrenheit = convertCelsiusToFahrenheit(weather.temperature);
    this.temperatureLabel = `It is ${fahrenheit}°F / ${weather.temperature}°C in ${weather.city}.`;
  };
}

export default ZipCodeWeatherViewModel;
