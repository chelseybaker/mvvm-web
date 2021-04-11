import {action, computed, makeAutoObservable, observable} from "mobx";
import Weather from "../../models/Weather";
import WeatherStorable from "../../stores/WeatherStorable";

class ViewModel {
  /** @observable */
  temperatureLabel = "Enter a zip code.";

  private zipcode?: string;

  private readonly weatherStore: WeatherStorable;

  constructor(weatherStore: WeatherStorable) {
    this.weatherStore = weatherStore;
    // Usually makeAutoObservable(this) suffices, using makeAutoObservable to explicitly show what properties are which
    makeAutoObservable<ViewModel, "zipcode">(this, {
      zipcode: observable,
      buttonDisabled: computed,
      onChangeZipCode: action,
    });
  }

  /**
   * @computed
   * Based on the zipcode observable, whenever zipcode changes, this is computed again and the view re renders.
   */
  get buttonDisabled(): boolean {
    return this.zipcode?.length !== 5;
  }

  /** @action
   * Updates an observable property.
   */
  onChangeZipCode = (value: string): void => {
    this.zipcode = value;
  };

  onClickGetWeather = (): void => {
    if (!this.zipcode || this.zipcode.length !== 5) return;
    this.weatherStore
      .getWeatherForZip(this.zipcode)
      .then((weather) => this.updateTemperature(weather))
      .catch(() => this.updateTemperature());
  };

  /**
   * @action
   * Updates the temperatureLabel
   */
  private updateTemperature = (weather?: Weather): void => {
    this.temperatureLabel = weather
      ? `It is ${weather.temperature.fahrenheit}°F / ${weather.temperature.celsius}°C in ${weather.city}.`
      : "Error getting temperature";
  };
}

export default ViewModel;
