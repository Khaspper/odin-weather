import "./styles.css";
import { getWeather, printThisWeeksWeather } from "./weatherAPI";
import { getGif } from "./gifAPI";

await getWeather("las vegas");
printThisWeeksWeather();
// getGif("cats");
