import MockOpenWeatherNetworker from "../../mocks/MockOpenWeatherNetworker";
import {LocalError, LocalErrorCode, NetworkError} from "../../../errors/LocalErrors";
import OpenWeatherDataTransformer from "../../../network/openWeather/OpenWeatherDataTransformer";

describe("OpenWeatherDataTransformer tests", () => {
  let dataTransformer: OpenWeatherDataTransformer;
  let mockNetworker: MockOpenWeatherNetworker;

  beforeEach(() => {
    mockNetworker = new MockOpenWeatherNetworker();
    dataTransformer = new OpenWeatherDataTransformer(mockNetworker);
  });

  describe("Given we are getting weather for a zip code", () => {
    let response: unknown;

    describe("when the response is successful", () => {
      describe("and the data is valid", () => {
        beforeEach(async () => {
          mockNetworker.getWeatherForZip = jest.fn(() =>
            Promise.resolve({status: 200, data: {main: {temp: 294}, name: "Test City Name"}})
          );
          response = await dataTransformer.getWeatherForZip("55555");
        });

        it("should call the API with the correct parameters", () => {
          expect(mockNetworker.getWeatherForZip).toBeCalledWith({zip: "55555"});
        });

        it("should return format the response into a Weather object", () => {
          expect(response).toEqual({
            city: "Test City Name",
            temperature: 21,
          });
        });
      });

      describe("and the response data is not valid", () => {
        beforeEach(async () => {
          // @ts-expect-error: We are purposely setting a mismatched type
          mockNetworker.getWeatherForZip = jest.fn(() =>
            Promise.resolve({status: 200, data: {main: {}, name: "Test City Name"}})
          );
          dataTransformer.getWeatherForZip("55555").catch((error) => (response = error));
        });

        it("should return an unexpected data error", () => {
          const error = response as LocalError;
          expect(error.code).toEqual(LocalErrorCode.UnexpectedDataFormat);
        });
      });
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        mockNetworker.getWeatherForZip = jest.fn(() => Promise.reject({status: 400, data: {}}));
      });

      it("should return a network error", () => {
        expect(dataTransformer.getWeatherForZip("55555")).rejects.toEqual(NetworkError);
      });
    });
  });

  describe("Given we are getting the weather for a location", () => {
    let response: unknown;

    describe("and the response is successful", () => {
      describe("when the data is valid", () => {
        beforeEach(async () => {
          mockNetworker.getWeatherForCoordinates = jest.fn(() =>
            Promise.resolve({status: 200, data: {main: {temp: 294}, name: "Test City Name"}})
          );
          response = await dataTransformer.getWeatherForCoordinates(123, 456);
        });

        it("should call the networker with the payload", () => {
          expect(mockNetworker.getWeatherForCoordinates).toBeCalledWith({lat: 456, lon: 123});
        });

        it("return the formatted weather", () => {
          expect(response).toEqual({
            city: "Test City Name",
            temperature: 21,
          });
        });
      });

      describe("and the response data is not valid", () => {
        beforeEach(async () => {
          // @ts-expect-error: We are purposely setting a mismatched type
          mockNetworker.getWeatherForCoordinates = jest.fn(() =>
            Promise.resolve({status: 200, data: {main: {}, name: "Test City Name"}})
          );
          dataTransformer.getWeatherForCoordinates(123, 456).catch((error) => (response = error));
        });

        it("should return an unexpected data error", () => {
          const error = response as LocalError;
          expect(error.code).toEqual(LocalErrorCode.UnexpectedDataFormat);
        });
      });
    });

    describe("when the call fails", () => {
      beforeEach(() => {
        mockNetworker.getWeatherForCoordinates = jest.fn(() => Promise.reject({status: 400, data: {}}));
      });

      it("should return a network error", () => {
        expect(dataTransformer.getWeatherForCoordinates(123, 456)).rejects.toEqual(NetworkError);
      });
    });
  });
});
