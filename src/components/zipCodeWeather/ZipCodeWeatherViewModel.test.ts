import ZipCodeWeatherViewModel from "./ZipCodeWeatherViewModel";
import MockWeather from "../../__tests__/mocks/MockWeather";
import MockWeatherStore from "../../__tests__/mocks/MockWeatherStore";

describe("ZipCodeWeather ZipCodeWeatherViewModel tests", () => {
  let viewModel: ZipCodeWeatherViewModel;
  let mockWeatherStore: MockWeatherStore;

  beforeEach(() => {
    mockWeatherStore = new MockWeatherStore();
    viewModel = new ZipCodeWeatherViewModel(mockWeatherStore);
  });

  describe("On init", () => {
    it("should have the 'Enter a zip' direction", () => {
      expect(viewModel.temperatureLabel).toEqual("Enter a zip code: ");
    });

    it("should disable the weatherButton since no zip is entered", () => {
      expect(viewModel.buttonDisabled).toBeTruthy();
    });
  });

  describe("Given a valid zip code is entered", () => {
    beforeEach(() => {
      viewModel.onChangeZipCode("48226");
    });

    it("should enable the weatherButton", () => {
      expect(viewModel.buttonDisabled).toBeFalsy();
    });

    describe("Given onClickGetWeather is clicked", () => {
      describe("when the response is successful", () => {
        beforeEach(() => {
          mockWeatherStore.getWeatherForZipPromise = Promise.resolve(MockWeather);
          viewModel.onClickGetWeather();
        });

        it("should have a new temperatureLabel", () => {
          expect(viewModel.temperatureLabel).toEqual("It is 70°F / 21°C in Detroit.");
        });
      });

      describe("when the response is unsuccessful", () => {
        beforeEach(() => {
          mockWeatherStore.getWeatherForZipPromise = Promise.reject({message: "Mock error"});
          viewModel.onClickGetWeather();
        });

        it("should show the error message", () => {
          expect(viewModel.temperatureLabel).toEqual("Error getting temperature");
        });
      });
    });
  });

  describe("Given an invalid zip is entered", () => {
    beforeEach(() => {
      viewModel.onChangeZipCode("4822"); // One digit short of a valid zip
    });

    it("should not enable the getWeather button", () => {
      expect(viewModel.buttonDisabled).toBeTruthy();
    });

    describe("when on clickGetWeather is clicked", () => {
      beforeEach(() => {
        mockWeatherStore.getWeatherForZip = jest.fn();
        viewModel.onClickGetWeather();
      });

      it("should not attempt to get weather", () => {
        expect(mockWeatherStore.getWeatherForZip).not.toBeCalled();
      });
    });
  });
});
