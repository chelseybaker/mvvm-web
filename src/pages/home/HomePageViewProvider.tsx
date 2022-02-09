import AppStores from "../../stores/AppStores";
import HomePageView from "./HomePageView";
import HomePageViewModel from "./HomePageViewModel";

/** Page providers inject dependencies into a page's view model */
const HomePageViewProvider = () => {
  const viewModel = new HomePageViewModel(AppStores.weatherStore, navigator.geolocation);
  return <HomePageView viewModel={viewModel} />;
};

export default HomePageViewProvider;
