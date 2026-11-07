import { clearMain } from "./clear-main";
import { searchCities } from "./geolocation";
import { makeCityLine } from "./city-line";

export async function makeSearchResults(location) {
  clearMain();

  const locations = await searchCities(location);

  const searchResults = document.createElement("div");
  searchResults.id = "search-results";

  locations.forEach((city) => {
    searchResults.appendChild(makeCityLine(city));
  });

  const main = document.querySelector("main");
  main.replaceChildren();
  main.appendChild(searchResults);
}
