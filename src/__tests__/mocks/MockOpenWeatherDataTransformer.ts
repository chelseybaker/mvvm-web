import Weather from "../../models/Weather";
import OpenWeatherDataTransformable from "../../network/openWeather/OpenWeatherDataTransformable";
import MockWeather from "./MockWeather";

class MockOpenWeatherDataTransformer implements OpenWeatherDataTransformable {
  getWeatherForCoordinates(longitude: number, latitude: number): Promise<Weather> {
    return Promise.resolve(MockWeather);
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return Promise.resolve(MockWeather);
  }
}

export default MockOpenWeatherDataTransformer;
