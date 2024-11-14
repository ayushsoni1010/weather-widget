import { WEATHER_API_KEY, WEATHER_API_URL } from "@/config/vars";
import axios from "axios";

export const getWeatherByLocation = async (q: string) => {
  const respone = await axios.get<WeatherType>(
    `${WEATHER_API_URL}?q=${q}&appid=${WEATHER_API_KEY}`
  );
  return respone.data;
};

export const getWeatherByCoordinates = async (
  latitude: number,
  longitude: number
) => {
  const respone = await axios.get<WeatherType>(
    `${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
  );
  return respone.data;
};
