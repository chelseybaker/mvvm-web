import CurrentWeatherResponse from "../../network/openWeather/CurrentWeatherResponse";
import OpenWeatherNetworkable, {NetworkPromise} from "../../network/openWeather/OpenWeatherNetworkable";
import MockCurrentWeatherResponse from "./MockCurrentWeatherResponse";

class MockOpenWeatherNetworker implements OpenWeatherNetworkable {
  getWeatherForCoordinates(params: {lon: number; lat: number}): NetworkPromise<CurrentWeatherResponse> {
    return Promise.resolve({status: 200, data: MockCurrentWeatherResponse});
  }

  getWeatherForZip(params: {zip: string}): NetworkPromise<CurrentWeatherResponse> {
    return Promise.resolve({status: 200, data: MockCurrentWeatherResponse});
  }
}

export default MockOpenWeatherNetworker;
