import NetworkInterface, {NetworkPromise} from "./NetworkInterface";
import Weather from "../models/Weather";
import axios from "axios";

class Networker implements NetworkInterface {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    baseUrl: string = "https://api.openweathermap.org/data/2.5",
    apiKey: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY ?? ""
  ) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getWeather(zipCode: string): NetworkPromise<Weather> {
    console.log(`${this.baseUrl}/weather?zip=${zipCode}&appid=${this.apiKey}`);
    return axios.get(`${this.baseUrl}/weather?zip=${zipCode}&appid=${this.apiKey}`);
  }
}

export default Networker;
