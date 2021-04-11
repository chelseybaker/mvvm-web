import Weather from "../../models/Weather";
import WeatherStore from "../../stores/WeatherStore";
import MockCurrentWeatherResponse from "../mocks/MockCurrentWeatherResponse";
import MockOpenWeatherNetwork from "../mocks/MockOpenWeatherNetwork";

describe("WeatherStore tests", () => {
  let weatherStore: WeatherStore;
  let mockNetworker: MockOpenWeatherNetwork;

  beforeEach(() => {
    mockNetworker = new MockOpenWeatherNetwork();
    weatherStore = new WeatherStore(mockNetworker);
  });

  describe("On init", () => {
    it("should have an undefined locationWeather", () => {
      expect(weatherStore).toBeDefined();
    });
  });

  describe("Given we are getting weather by zip", () => {
    describe("when the response is successful", () => {
      beforeEach(() => {
        mockNetworker.getWeatherForZip = jest.fn(() =>
          Promise.resolve({status: 200, data: MockCurrentWeatherResponse})
        );
      });

      it("should transformer the response to a Weather", (done) => {
        const expectedWeather: Weather = {
          city: "Mock City Name",
          temperature: {
            celsius: 10,
            fahrenheit: 50,
          },
        };
        weatherStore.getWeatherForZip("48101").then((weather) => {
          expect(weather).toEqual(expectedWeather);
          done();
        });
      });
    });
  });

  describe("Given we are getting weather for coordinates", () => {
    describe("when the response is successful", () => {
      beforeEach(() => {
        mockNetworker.getWeatherFoCoordinates = jest.fn(() =>
          Promise.resolve({status: 200, data: MockCurrentWeatherResponse})
        );
        weatherStore.getWeatherForLocation(123, 456);
      });

      it("should update the locationWeather observable", () => {
        const expectedWeather: Weather = {
          city: "Mock City Name",
          temperature: {
            celsius: 10,
            fahrenheit: 50,
          },
        };
        expect(weatherStore.locationWeather).toEqual(expectedWeather);
      });
    });
  });
});
