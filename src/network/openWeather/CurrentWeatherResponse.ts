type CurrentWeatherResponse = {
  main: {
    temp: number;
  };
  name: string;
};

export const isCurrentWeatherResponse = (object: unknown): object is CurrentWeatherResponse => {
  const response = object as CurrentWeatherResponse;
  return !!response && !!response.main && typeof response.main.temp === "number" && !!response.name;
};

export default CurrentWeatherResponse;
