import CurrentLocationWeatherViewModel, {
  GeoLocator,
} from "../../components/currentLocationWeather/CurrentLocationWeatherViewModel";
import ZipCodeWeatherViewModel from "../../components/zipCodeWeather/ZipCodeWeatherViewModel";
import WeatherStorable from "../../stores/WeatherStorable";

class HomePageViewModel {
  readonly currentLocationViewModel: CurrentLocationWeatherViewModel;
  readonly zipCodeViewModel: ZipCodeWeatherViewModel;

  constructor(weatherStore: WeatherStorable, geoLocator: GeoLocator) {
    this.currentLocationViewModel = new CurrentLocationWeatherViewModel(weatherStore, geoLocator);
    this.zipCodeViewModel = new ZipCodeWeatherViewModel(weatherStore);
  }
}

export default HomePageViewModel;
