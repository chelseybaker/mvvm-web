import {GeoLocator} from "../../components/currentLocationWeather/CurrentLocationWeatherViewModel";

class MockGeoLocator implements GeoLocator {
  getCurrentPosition = (success: (position: GeolocationPosition) => void, errorCallback?: PositionErrorCallback) => {
    success({
      // @ts-ignore We don't need all the data to be filled in
      coords: {
        longitude: -83.045753,
        latitude: 42.331429,
      },
    });
  };
}

export default MockGeoLocator;
