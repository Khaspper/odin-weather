const weatherAPIkey = "83RVYNF7EDJEKWLXMA3UNATQZ";
const weatherURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const weeklyWeather = [];

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
    const dayObj = makeDayObj(days[i]);
    weeklyWeather.push(dayObj);
  }
  console.log(weeklyWeather);
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

// I need it to look like this
// {
//   conditions: "Clear",
//   dateTime: "2025-05-26",
//   description: "Clear conditions throughout the day.",
//   temp: 86.1,
//   tempmax: 96.1,
//   tempmin: 76.1,
//   icon: "clear-day",
// }
