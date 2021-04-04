import ViewModel from "./viewModel";
import AppStores from "../../stores/AppStores";
import View from "./view";

const WeatherView = () => {
  const viewModel = new ViewModel(AppStores.weatherStore);
  return <View viewModel={viewModel} />;
};

export default WeatherView;
