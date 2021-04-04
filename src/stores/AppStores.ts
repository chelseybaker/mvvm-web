import WeatherStore from "./WeatherStore";
import Networker from "../network/Networker";

class AppStores {
  static readonly weatherStore = new WeatherStore(new Networker());
}

export default AppStores;
