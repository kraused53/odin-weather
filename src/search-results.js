import "./search-results.css";
import "./css/buttons.css";
import { clearMain } from "./clear-main";
import { searchCities } from "./api-functions/geolocation";
import { makeWeatherScreen } from "./make-weather-report";

const leftCard = document.createElement("div");
leftCard.id = "search-results-left";
leftCard.className = "search-results-card left-card";

const centerCard = document.createElement("div");
centerCard.id = "search-results-center";
centerCard.className = "search-results-card center-card";

const rightCard = document.createElement("div");
rightCard.id = "search-results-right";
rightCard.className = "search-results-card right-card";

const leftButton = document.createElement("button");
leftButton.id = "search-results-left-button";
leftButton.type = "button";
leftButton.className = "search-results-button";
leftButton.textContent = "<";

const rightButton = document.createElement("button");
rightButton.id = "search-results-right-button";
rightButton.type = "button";
rightButton.className = "search-results-button";
rightButton.textContent = ">";

const submitButton = document.createElement("button");
submitButton.id = "search-results-submit-button";
submitButton.type = "button";
submitButton.className = "search-results-button";
submitButton.textContent = "Use Location";

let max = 1;
let curr = 0;

let currentLocations = [];

export async function makeSearchResults(location) {
  clearMain();

  currentLocations = await searchCities(location);

  const searchResults = document.createElement("div");
  searchResults.id = "search-results";

  searchResults.appendChild(leftCard);
  searchResults.appendChild(centerCard);
  searchResults.appendChild(rightCard);
  searchResults.appendChild(leftButton);
  searchResults.appendChild(rightButton);
  searchResults.appendChild(submitButton);

  max = currentLocations.length - 1;
  curr = 0;

  const main = document.querySelector("main");
  main.replaceChildren();
  main.appendChild(searchResults);

  updateCards();
}

rightButton.addEventListener("click", () => {
  if (curr < max) {
    curr += 1;
  }

  updateCards();
});

leftButton.addEventListener("click", () => {
  if (curr > 0) {
    curr -= 1;
  }

  updateCards();
});

submitButton.addEventListener("click", () => {
  makeWeatherScreen(currentLocations[curr]);
});

function updateCards() {
  if (curr === 0) {
    leftCard.classList.add("hide");
  } else {
    leftCard.classList.remove("hide");
    leftCard.replaceChildren();
    leftCard.appendChild(makeCityDiv(currentLocations[curr - 1]));
  }

  if (curr === max) {
    rightCard.classList.add("hide");
  } else {
    rightCard.classList.remove("hide");
    rightCard.replaceChildren();
    rightCard.appendChild(makeCityDiv(currentLocations[curr + 1]));
  }

  centerCard.replaceChildren();
  centerCard.appendChild(makeCityDiv(currentLocations[curr]));

  console.log(curr - 1, curr, curr + 1);
}

function makeCityDiv(city) {
  const mainDiv = document.createElement("div");
  mainDiv.className = "city-card-div";

  const locationDiv = document.createElement("div");
  locationDiv.className = "city-card-location-div";

  // City Name
  const nameTitle = document.createElement("p");
  nameTitle.className = "city-card-title city-name-title";
  nameTitle.textContent = "Name";

  const name = document.createElement("p");
  name.className = "city-card-data city-name";
  name.textContent = city.name;

  // City Admin Zone
  const adminTitle = document.createElement("p");
  adminTitle.className = "city-card-title city-admin-title";
  adminTitle.textContent = "Admin";

  const admin = document.createElement("p");
  admin.className = "city-card-data city-admin";
  admin.textContent = city.admin1;

  // City Country
  const countryTitle = document.createElement("p");
  countryTitle.className = "city-card-title city-country-title";
  countryTitle.textContent = "Country";

  const country = document.createElement("p");
  country.className = "city-card-data city-country";
  country.textContent = city.country_code;

  // City Location
  const locationTitle = document.createElement("p");
  locationTitle.className = "city-card-title city-location-title";
  locationTitle.textContent = "Location";

  const latTitle = document.createElement("p");
  latTitle.className = "city-card-title city-lat-title";
  latTitle.textContent = "Latitude";

  const lonTitle = document.createElement("p");
  lonTitle.className = "city-card-title city-lon-title";
  lonTitle.textContent = "Longitude";

  const lat = document.createElement("p");
  lat.className = "city-card-data city-lat";
  lat.textContent = city.latitude;

  const lon = document.createElement("p");
  lon.className = "city-card-data city-lon";
  lon.textContent = city.longitude;

  locationDiv.appendChild(locationTitle);
  locationDiv.appendChild(latTitle);
  locationDiv.appendChild(lat);
  locationDiv.appendChild(lonTitle);
  locationDiv.appendChild(lon);

  mainDiv.appendChild(nameTitle);
  mainDiv.appendChild(name);
  mainDiv.appendChild(adminTitle);
  mainDiv.appendChild(admin);
  mainDiv.appendChild(countryTitle);
  mainDiv.appendChild(country);
  mainDiv.appendChild(locationDiv);

  return mainDiv;
}
