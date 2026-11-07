import { clearMain } from "./clear-main";
import { makeSearchResults } from "./search-results";

export function makeSearchBar() {
  clearMain();

  const locationSearch = document.createElement("form");
  locationSearch.id = "location-search";

  const locationInput = document.createElement("input");
  locationInput.id = "location-input";
  locationInput.type = "text";
  locationInput.input = "location-input";
  locationInput.placeholder = "Search for a location...";

  const locationSubmit = document.createElement("button");
  locationSubmit.id = "location-submit";
  locationSubmit.type = "submit";
  locationSubmit.textContent = "Search";

  locationSearch.appendChild(locationInput);
  locationSearch.appendChild(locationSubmit);

  const main = document.querySelector("main");
  main.appendChild(locationSearch);

  locationSearch.addEventListener("submit", (event) => {
    event.preventDefault();

    const location = locationInput.value.trim();
    locationInput.value = "";

    if (location.length == 0) {
      showLocationError("Empty Search!", "Please enter a location...");
      return;
    }

    makeSearchResults(location);
  });
}

function showLocationError(errorTitle, errorBody) {
  const errorHeader = document.getElementById("error-hero");
  errorHeader.textContent = errorTitle;

  const errorText = document.getElementById("error-body");
  errorText.textContent = errorBody;

  const errorPopUp = document.getElementById("error-dialog");
  errorPopUp.showModal();
}
