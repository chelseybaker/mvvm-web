import Weather from "../../models/Weather";

interface OpenWeatherDataTransformable {
  getWeatherForZip(zipCode: string): Promise<Weather>;

  getWeatherForCoordinates(longitude: number, latitude: number): Promise<Weather>;
}

export default OpenWeatherDataTransformable;
