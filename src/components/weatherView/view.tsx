import ViewModel from "./viewModel";
import { observer } from "mobx-react";

interface Props {
  viewModel: ViewModel;
}

const View = ({ viewModel }: Props) => (
  <div>
    <p>{viewModel.currentTemperature}</p>
    <button onClick={viewModel.refreshWeather}>Refresh weather</button>
  </div>
);

export default observer(View);
