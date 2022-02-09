import OpenWeatherNetworker from "../network/openWeather/OpenWeatherNetworker";
import WeatherStore from "./WeatherStore";

/** Global app stores are initialized and maintained here */
class AppStores {
  static readonly weatherStore = new WeatherStore(new OpenWeatherNetworker());
}

export default AppStores;
