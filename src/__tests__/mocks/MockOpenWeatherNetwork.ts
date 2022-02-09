import CurrentWeatherResponse from "../../network/openWeather/CurrentWeatherResponse";
import OpenWeatherNetworkable, {NetworkPromise} from "../../network/openWeather/OpenWeatherNetworkable";
import MockCurrentWeatherResponse from "./MockCurrentWeatherResponse";

class MockOpenWeatherNetwork implements OpenWeatherNetworkable {
  getWeatherForCoordinates = (longitude: number, latitude: number): NetworkPromise<CurrentWeatherResponse> => {
    return Promise.resolve({status: 200, data: MockCurrentWeatherResponse});
  };

  getWeatherForZip = (zipCode: string): NetworkPromise<CurrentWeatherResponse> => {
    return Promise.resolve({status: 200, data: MockCurrentWeatherResponse});
  };
}

export default MockOpenWeatherNetwork;
