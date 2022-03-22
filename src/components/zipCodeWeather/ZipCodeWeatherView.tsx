import ZipCodeWeatherViewModel from "./ZipCodeWeatherViewModel";
import {observer} from "mobx-react";

interface Props {
  viewModel: ZipCodeWeatherViewModel;
}

const ZipCodeWeatherView = ({viewModel}: Props) => (
  <>
    <div className={"mb-1"}>
      <span>{viewModel.temperatureLabel}</span>
      <input onChange={(e) => viewModel.onChangeZipCode(e.target.value)} />
      <button disabled={viewModel.buttonDisabled} onClick={viewModel.onClickGetWeather}>
        {viewModel.actionButtonText}
      </button>
    </div>
    <div>{viewModel.weatherInformation}</div>
  </>
);

export default observer(ZipCodeWeatherView);
