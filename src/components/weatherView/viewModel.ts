import WeatherStoreInterface from "../../stores/WeatherStoreInterface";

class ViewModel {
  private readonly weatherStore: WeatherStoreInterface;
  constructor(weatherStore: WeatherStoreInterface) {
    this.weatherStore = weatherStore;
  }

  refreshWeather = (): void => {
    this.weatherStore.getWeather("48101").then();
  };

  get currentTemperature(): string {
    const currentWeather = this.weatherStore.currentWeather;
    if (currentWeather) {
    }
    return this.weatherStore.currentWeather
      ? `Current temperature is ${this.weatherStore.currentWeather.main.temp}`
      : "Temperature not yet loaded";
  }
}

export default ViewModel;
