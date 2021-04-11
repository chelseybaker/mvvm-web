import View from "./View";
import ViewModel from "./ViewModel";

const CounterView = () => {
  const viewModel = new ViewModel(document);
  return <View viewModel={viewModel} />;
};

export default CounterView;
