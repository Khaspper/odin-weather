import { format, parseISO } from "date-fns";

const weatherAPIkey = "83RVYNF7EDJEKWLXMA3UNATQZ";
const weatherThisWeek = document.querySelectorAll(".weather-day");
const weatherURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export const weeklyWeather = [];

export async function getWeather(location) {
  try {
    const response = await fetch(
      `${weatherURL}${location}?key=${weatherAPIkey}`
    );
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const json = await response.json();
    addDaysToWeekWeather(json.days);
  } catch (error) {
    console.log("Error:", error);
  }
}

function addDaysToWeekWeather(days) {
  for (let i = 0; i < 7; i++) {
    weeklyWeather.push(makeDayObj(days[i]));
  }
  // console.log(weeklyWeather[0]);
}

function makeDayObj(day) {
  return {
    conditions: day.conditions,
    datetime: day.datetime,
    description: day.description,
    temp: day.temp,
    tempmax: day.tempmax,
    tempmin: day.tempmin,
    icon: day.icon,
  };
}

export function printThisWeeksWeather() {
  let i = 0;
  for (const day of weatherThisWeek) {
    const rawDate = weeklyWeather[i].datetime;
    //? This makes sure that it is specified to the users timezone
    const localDate = parseISO(rawDate);
    const formatted = format(localDate, "MMMM do");
    day.textContent = formatted;
    i++;
  }
}

//TODO: Dynamic import???
//TODO: Change Image Icon for .weather-icon
export function selectWeatherDay(selectedDay) {
  const json = getJsonForSelectedDay(selectedDay);
  const weatherDescription = document.querySelector(".weather-description");
  const weatherTemperature = document.querySelector(".weather-temperature");
  weatherDescription.textContent = json.conditions;
  weatherTemperature.innerHTML = `${json.temp}&#176;`;
}

export function getJsonForSelectedDay(selectedDay) {
  const index = selectedDay.split("-")[1] - 1;
  return weeklyWeather[index];
}
// This is what it looks like
// {
//   conditions: "Clear",
//   datetime: "2025-05-26",
//   description: "Clear conditions throughout the day.",
//   temp: 86.1,
//   tempmax: 96.1,
//   tempmin: 76.1,
//   icon: "clear-day",
// }
