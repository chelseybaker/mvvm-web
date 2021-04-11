import ViewModel from "./ViewModel";
import {observer} from "mobx-react";

interface Props {
  viewModel: ViewModel;
}

const View = ({viewModel}: Props) => (
  <div>
    <button onClick={viewModel.getLocation}>Get Weather for Location</button>
    <p>{viewModel.locationTemperature}</p>
  </div>
);

export default observer(View);
