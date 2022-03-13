import {isLocalError, NetworkError, UnexpectedDataFormatError} from "../../errors/LocalErrors";
import Weather from "../../models/Weather";
import CurrentWeatherResponse, {isCurrentWeatherResponse} from "./CurrentWeatherResponse";
import OpenWeatherDataTransformable from "./OpenWeatherDataTransformable";
import OpenWeatherNetworkable, {NetworkResponse} from "./OpenWeatherNetworkable";

class OpenWeatherDataTransformer implements OpenWeatherDataTransformable {
  private readonly networker: OpenWeatherNetworkable;
  constructor(networker: OpenWeatherNetworkable) {
    this.networker = networker;
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return this.networker
      .getWeatherForZip({zip: zipCode})
      .then((response) => this.processCurrentWeatherResponse(response))
      .catch((error) => this.processCurrentWeatherError(error));
  }

  getWeatherForCoordinates(longitude: number, latitude: number): Promise<Weather> {
    return this.networker
      .getWeatherForCoordinates({lon: longitude, lat: latitude})
      .then((response) => this.processCurrentWeatherResponse(response))
      .catch((error) => this.processCurrentWeatherError(error));
  }

  private processCurrentWeatherResponse(response: NetworkResponse<CurrentWeatherResponse>): Promise<Weather> {
    // 1. Verify the response is in the format we expect. If not, return a rejected promise with an error explaining
    if (!isCurrentWeatherResponse(response.data)) {
      return Promise.reject(UnexpectedDataFormatError);
    }

    // 2. Translate the Kelvin temperature into Celsius
    const kelvin = response.data.main.temp;
    const celsius = Math.round(kelvin - 273.15);
    // 3. Create a Weather object
    const weather: Weather = {
      temperature: celsius,
      city: response.data.name,
    };
    // 4. Resolve the promise with the weather object
    return Promise.resolve(weather);
  }

  private processCurrentWeatherError(error: Error): Promise<never> {
    if (isLocalError(error)) return Promise.reject(error);
    return Promise.reject(NetworkError);
  }
}

export default OpenWeatherDataTransformer;
