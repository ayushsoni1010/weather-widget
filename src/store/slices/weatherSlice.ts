import { createSlice } from "@reduxjs/toolkit";

interface WeatherState {
  location: string;
  previousSearches: Array<any>;
  weather: any;
  error: string | null;
}

const initialState: WeatherState = {
  location: "",
  previousSearches: [],
  weather: null,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setWeather: (state, action) => {
      state.weather = action.payload;
    },
    setPreviousSearch: (state, action) => {
      state.previousSearches = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLocation, setWeather, setPreviousSearch, setError } =
  weatherSlice.actions;

export default weatherSlice.reducer;
