import OpenWeatherNetwork, {NetworkPromise} from "../OpenWeatherNetworkable";
import axios from "axios";
import CurrentWeatherResponse from "./CurrentWeatherResponse";

class OpenWeatherNetworker implements OpenWeatherNetwork {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    baseUrl: string = "https://api.openweathermap.org/data/2.5",
    apiKey: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY ?? ""
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getWeatherForZip(zipCode: string): NetworkPromise<CurrentWeatherResponse> {
    return axios.get(`${this.baseUrl}/weather?zip=${zipCode}&appid=${this.apiKey}`);
  }

  getWeatherFoCoordinates(longitude: number, latitude: number): NetworkPromise<CurrentWeatherResponse> {
    return axios.get(`${this.baseUrl}/weather?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`);
  }
}

export default OpenWeatherNetworker;
