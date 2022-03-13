import MockGeoLocator from "../../__tests__/mocks/MockGeoLocator";
import MockWeatherStore from "../../__tests__/mocks/MockWeatherStore";

import HomePageViewModel from "./HomePageViewModel";

describe("HomePageViewModel tests", () => {
  let viewModel: HomePageViewModel;
  let mockWeatherStore: MockWeatherStore;
  let mockGeoLocator: MockGeoLocator;

  beforeEach(() => {
    mockWeatherStore = new MockWeatherStore();
    mockGeoLocator = new MockGeoLocator();
    viewModel = new HomePageViewModel(mockWeatherStore, mockGeoLocator);
  });

  describe("On init", () => {
    it("should have a currentLocationViewModel", () => {
      expect(viewModel.currentLocationViewModel).toBeDefined();
    });

    it("should have a zipCodeViewModel", () => {
      expect(viewModel.zipCodeViewModel).toBeDefined();
    });
  });
});
