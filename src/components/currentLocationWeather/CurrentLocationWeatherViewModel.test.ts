import _ from "lodash";
import MockGeoLocator from "../../__tests__/mocks/MockGeoLocator";
import MockWeather from "../../__tests__/mocks/MockWeather";
import MockWeatherStore from "../../__tests__/mocks/MockWeatherStore";
import CurrentLocationWeatherViewModel from "./CurrentLocationWeatherViewModel";

describe("CurrentLocationWeather viewModel tests", () => {
  let viewModel: CurrentLocationWeatherViewModel;
  let mockGeoLocator: MockGeoLocator;
  let mockWeatherStore: MockWeatherStore;

  beforeEach(() => {
    mockGeoLocator = new MockGeoLocator();
    mockWeatherStore = new MockWeatherStore();
    viewModel = new CurrentLocationWeatherViewModel(mockWeatherStore, mockGeoLocator);
  });

  describe("On init", () => {
    it("should have the initial locationTemperature label", () => {
      expect(viewModel.locationTemperature).toEqual("[Location weather not loaded]");
    });
  });

  describe("Given currentLocationWeather on weatherStore is updated", () => {
    beforeEach(() => {
      const mockWeather = _.cloneDeep(MockWeather);
      mockWeatherStore.currentLocationWeather = mockWeather;
    });

    it("should recompute the label", () => {
      expect(viewModel.locationTemperature).toEqual("It is 70°F / 21°C in Detroit.");
    });
  });

  describe("Given the user clicksGetLocation", () => {
    describe("when permission is granted", () => {
      beforeEach(() => {
        // MockGeoLocator by default calls success, so no setup needed
        mockWeatherStore.getWeatherForLocation = jest.fn(() => mockWeatherStore.getWeatherForLocationPromise);
        viewModel.getLocation();
      });

      it("should call the weatherStore to get temperature by location", () => {
        expect(mockWeatherStore.getWeatherForLocation).toBeCalled();
      });
    });

    describe("when permission is not granted", () => {
      beforeEach(() => {
        // @ts-ignore Ignoring the mismatched error type since it isn't used
        mockGeoLocator.getCurrentPosition = jest.fn((success, error) => error?.());
        mockWeatherStore.getWeatherForLocation = jest.fn();
        viewModel.getLocation();
      });

      it("should not call the weatherStore to get location since there's no location", () => {
        expect(mockWeatherStore.getWeatherForLocation).not.toBeCalled();
      });

      it("should re calculate the locationTemperature", () => {
        expect(viewModel.locationTemperature).toEqual("[Location permission denied]");
      });
    });
  });
});
