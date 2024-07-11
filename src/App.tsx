import Weather from "@/pages/weather";
import { Provider } from "react-redux";
import { store } from "@/store";

function App() {
  return (
    <Provider store={store}>
      <Weather />
    </Provider>
  );
}

export default App;
