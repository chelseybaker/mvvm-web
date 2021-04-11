import React from "react";
import "./App.css";
import CounterView from "./components/counter/CounterView";
import CurrentLocationWeatherView from "./components/currentLocationWeather/CurrentLocationWeatherView";
import ZipCodeWeatherView from "./components/zipCodeWeather/ZipCodeWeatherView";

function App() {
  return (
    <div className="App">
      <ZipCodeWeatherView />
      <CurrentLocationWeatherView />
      <CounterView />
    </div>
  );
}

export default App;
