import Weather from "../../models/Weather";
import CurrentWeatherResponse, {isCurrentWeatherResponse} from "./CurrentWeatherResponse";
import OpenWeatherDataTransformable from "./OpenWeatherDataTransformable";
import OpenWeatherNetworkable, {NetworkResponse} from "./OpenWeatherNetworkable";

const NetworkError = {
  message: "Data is in an unexpected format",
};

const UnexpectedDataFormatError = {
  message: "Data is in an unexpected format",
};

class OpenWeatherDataTransformer implements OpenWeatherDataTransformable {
  private readonly networker: OpenWeatherNetworkable;
  constructor(networker: OpenWeatherNetworkable) {
    this.networker = networker;
  }

  getWeatherForZip(zipCode: string): Promise<Weather> {
    return this.networker
      .getWeatherForZip(zipCode)
      .then((response) => this.processCurrentWeatherResponse(response))
      .catch(() => Promise.reject(NetworkError));
  }

  getWeatherForCoordinates(longitude: number, latitude: number): Promise<Weather> {
    return this.networker
      .getWeatherForCoordinates(longitude, latitude)
      .then((response) => this.processCurrentWeatherResponse(response))
      .catch(() => Promise.reject(NetworkError));
  }

  private processCurrentWeatherResponse(response: NetworkResponse<CurrentWeatherResponse>): Promise<Weather> {
    // 1. Verify the response is in the format we expect. If not, return a rejected promise with an error explaining
    if (!isCurrentWeatherResponse(response)) {
      return Promise.reject(UnexpectedDataFormatError);
    }

    // 2. Translate the Kelvin temperature into Celsius
    const kelvin = response.data.main.temp;
    const celsius = Math.floor(kelvin - 273.15);
    // 3. Create a Weather object
    const weather: Weather = {
      temperature: celsius,
      city: response.data.name,
    };
    // 4. Resolve the promise with the weather object
    return Promise.resolve(weather);
  }
}

export default OpenWeatherDataTransformer;
