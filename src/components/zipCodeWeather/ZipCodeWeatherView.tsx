import ZipCodeWeatherViewModel from "./ZipCodeWeatherViewModel";
import {observer} from "mobx-react";

interface Props {
  viewModel: ZipCodeWeatherViewModel;
}

const ZipCodeWeatherView = ({viewModel}: Props) => (
  <div>
    <span>{viewModel.temperatureLabel}</span>
    <input onChange={(e) => viewModel.onChangeZipCode(e.target.value)} />
    <button disabled={viewModel.buttonDisabled} onClick={viewModel.onClickGetWeather}>
      Search
    </button>
  </div>
);

export default observer(ZipCodeWeatherView);
