import ViewModel from "./ViewModel";
import {observer} from "mobx-react";

interface Props {
  viewModel: ViewModel;
}

const View = ({viewModel}: Props) => (
  <div>
    <div>
      <input onChange={(e) => viewModel.onChangeZipCode(e.target.value)} />
      <button disabled={viewModel.buttonDisabled} onClick={viewModel.onClickGetWeather}>
        Get Weather
      </button>
    </div>

    <p>{viewModel.temperatureLabel}</p>
  </div>
);

export default observer(View);
