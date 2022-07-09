import {UnexpectedDataFormatError} from "../../errors/LocalErrors";
import WeatherStore from "../../stores/WeatherStore";
import MockOpenWeatherDataTransformer from "../mocks/MockOpenWeatherDataTransformer";
import MockWeather from "../mocks/MockWeather";

describe("WeatherStore tests", () => {
  let weatherStore: WeatherStore;
  let mockDataTransformer: MockOpenWeatherDataTransformer;

  beforeEach(() => {
    mockDataTransformer = new MockOpenWeatherDataTransformer();
    weatherStore = new WeatherStore(mockDataTransformer);
  });

  describe("On init", () => {
    it("should have an undefined currentLocationWeather", () => {
      expect(weatherStore.currentLocationWeather).toBeUndefined();
    });
  });

  describe("Given we are getting the weather by zip (getWeatherForZip)", () => {
    describe("when it is successful", () => {
      it("should return the weather object", () => {
        expect(weatherStore.getWeatherForZip("55555")).resolves.toEqual(MockWeather);
      });
    });

    describe("when it is unsuccessful", () => {
      beforeEach(() => {
        mockDataTransformer.getWeatherForZip = jest.fn(() => Promise.reject(UnexpectedDataFormatError));
      });

      it("should return the error", () => {
        expect(weatherStore.getWeatherForZip("55555")).rejects.toEqual(UnexpectedDataFormatError);
      });
    });
  });

  describe("Given we are getting the weather by coordinates (getWeatherForLocation)", () => {
    let response: unknown;

    describe("when it is successful", () => {
      beforeEach(async () => {
        response = await weatherStore.getWeatherForLocation(123, 456);
      });

      it("should return the weather object", () => {
        expect(response).toBeUndefined();
      });

      it("should update the current location", () => {
        expect(weatherStore.currentLocationWeather).toEqual(MockWeather);
      });
    });

    describe("when it is unsuccessful", () => {
      let response: unknown;

      beforeEach(async () => {
        weatherStore.currentLocationWeather = MockWeather;
        mockDataTransformer.getWeatherForCoordinates = jest.fn(() => Promise.reject(UnexpectedDataFormatError));
        await weatherStore.getWeatherForLocation(123, 456).catch((error) => (response = error));
      });

      it("should return the error", () => {
        expect(response).toEqual(UnexpectedDataFormatError);
      });

      it("should clear the current weather", () => {
        expect(weatherStore.currentLocationWeather).toBeUndefined();
      });
    });
  });
});
