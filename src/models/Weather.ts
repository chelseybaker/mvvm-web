/**
 * My Weather App's Weather model. This is purposely decoupled and designed separately from the API we are using.
 * This model is what makes the most sense for my app
 */
type Weather = {
  temperature: number; // Temperature in Celsius
  city: string; // Name of the city
};

export default Weather;
