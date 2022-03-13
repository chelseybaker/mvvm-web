import OpenWeatherNetworkable, {NetworkPromise} from "./OpenWeatherNetworkable";
import axios from "axios";
import CurrentWeatherResponse from "./CurrentWeatherResponse";

/**
 * This class should exclusively be API call definitions and data
 * No other logic (data transformations, type checks, etc.) should happen here
 */
class OpenWeatherNetworker implements OpenWeatherNetworkable {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    baseUrl: string = "https://api.openweathermap.org/data/2.5",
    apiKey: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY ?? ""
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getWeatherForZip(params: {zip: string}): NetworkPromise<CurrentWeatherResponse> {
    return axios.get(`${this.baseUrl}/weather`, {params: {...params, appid: this.apiKey}});
  }

  getWeatherForCoordinates(params: {lon: number; lat: number}): NetworkPromise<CurrentWeatherResponse> {
    return axios.get(`${this.baseUrl}/weather`, {params: {...params, appid: this.apiKey}});
  }
}

export default OpenWeatherNetworker;
