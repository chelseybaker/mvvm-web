import CurrentLocationWeatherViewModel from "./CurrentLocationWeatherViewModel";
import {observer} from "mobx-react";

interface Props {
  viewModel: CurrentLocationWeatherViewModel;
}

const CurrentLocationWeatherView = ({viewModel}: Props) => (
  <div>
    <button onClick={viewModel.getLocation}>Get Weather for Location</button>
    <p>{viewModel.locationTemperature}</p>
  </div>
);

export default observer(CurrentLocationWeatherView);
