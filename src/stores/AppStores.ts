import OpenWeatherNetworker from "../network/openWeather/OpenWeatherNetworker";
import WeatherStore from "./WeatherStore";

class AppStores {
  static readonly weatherStore = new WeatherStore(new OpenWeatherNetworker());
}

export default AppStores;
