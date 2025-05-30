import { getJsonForSelectedDay } from "./weatherAPI";

const giphyAPIkey = "BR2DuOOkBFz9u2pzDHyKSRgQHfk8gzSQ";
const giphyURL = "https://api.giphy.com/v1/gifs/translate?";
const gifContainer = document.querySelector(".gif-container");

export async function getGif(selectedDay) {
  try {
    const weatherJson = getJsonForSelectedDay(selectedDay);
    const searchQuery = `${weatherJson.conditions}`;
    console.log(searchQuery);
    const response = await fetch(
      `${giphyURL}api_key=${giphyAPIkey}&s=${searchQuery}`
    );
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    const img = document.createElement("img");
    const json = await response.json();
    const gifURL = json.data.images.original.url;
    img.src = gifURL;

    //! Change this to the actual gif contatiner
    gifContainer.innerHTML = "";
    gifContainer.appendChild(img);
  } catch (error) {
    console.log("Error:", error);
  }
}
