import CurrentLocationWeatherView from "../../components/currentLocationWeather/CurrentLocationWeatherView";
import ZipCodeWeatherView from "../../components/zipCodeWeather/ZipCodeWeatherView";
import HomePageViewModel from "./HomePageViewModel";
import React from "react";

interface Props {
  viewModel: HomePageViewModel;
}

const HomePageView = ({viewModel}: Props) => (
  <div className={"stacked"}>
    <ZipCodeWeatherView viewModel={viewModel.zipCodeViewModel} />
    <CurrentLocationWeatherView viewModel={viewModel.currentLocationViewModel} />
  </div>
);

export default HomePageView;
