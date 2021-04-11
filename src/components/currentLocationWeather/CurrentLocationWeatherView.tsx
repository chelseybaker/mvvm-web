import ViewModel from "./ViewModel";
import AppStores from "../../stores/AppStores";
import View from "./View";

const CurrentLocationWeatherView = () => {
  const viewModel = new ViewModel(AppStores.weatherStore, navigator.geolocation);
  return <View viewModel={viewModel} />;
};

export default CurrentLocationWeatherView;
