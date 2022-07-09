import MockGeoLocator from "../../mocks/MockGeoLocator";
import MockWeatherStore from "../../mocks/MockWeatherStore";

import HomePageViewModel from "../../../pages/home/HomePageViewModel";

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
