import {observer} from "mobx-react";
import ViewModel from "./ViewModel";

interface Props {
  viewModel: ViewModel;
}

const View = ({viewModel}: Props) => (
  <div>
    <p>{viewModel.countLabel}</p>
    <button onClick={viewModel.onClick}>Click me</button>
  </div>
);

export default observer(View);
