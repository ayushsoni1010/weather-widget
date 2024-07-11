import { WEATHER_API_KEY, WEATHER_API_URL } from "@/config/vars";
import axios from "axios";

export const getWeatherByLocation = async (q: string): Promise<WeatherType> => {
  const respone = await axios.get<WeatherType>(
    `${WEATHER_API_URL}?q=${q}&appid=${WEATHER_API_KEY}`
  );
  return respone.data;
};
