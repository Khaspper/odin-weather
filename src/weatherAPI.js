const weatherAPIkey = "83RVYNF7EDJEKWLXMA3UNATQZ";
const weatherURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

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
  } catch (error) {
    console.log("Error:", error);
  }
}
