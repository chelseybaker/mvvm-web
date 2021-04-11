import ViewModel from "./ViewModel";
import AppStores from "../../stores/AppStores";
import View from "./View";

const ZipCodeWeatherView = () => {
  const viewModel = new ViewModel(AppStores.weatherStore);
  return <View viewModel={viewModel} />;
};

export default ZipCodeWeatherView;
