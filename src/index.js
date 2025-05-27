import "./styles.css";
import {
  getWeather,
  printThisWeeksWeather,
  selectWeatherDay,
} from "./weatherAPI";
import { getGif } from "./gifAPI";

const weatherWeek = document.querySelector(".weather-week");

weatherWeek.addEventListener("click", (event) => {
  selectWeatherDay(event.target.id);
  getGif(event.target.id);
});

await getWeather("las vegas");
printThisWeeksWeather();
selectWeatherDay("day-1");
getGif("day-1");
