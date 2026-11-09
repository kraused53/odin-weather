import { makeHomeScreen } from "./home-screen";
import { makeSearchResults } from "./search-results";
import { getUnits, toggleUnits } from "./storage/unit-storage";

import "./css/header.css";
import "./css/buttons.css";
import "./css/reset.css";
import "./css/colors.css";
import "./css/page-layout.css";
import "./css/error-dialog.css";

makeHomeScreen();

// Link search button to geocoding api
const locationSearch = document.getElementById("location-search");
locationSearch.addEventListener("submit", (event) => {
  event.preventDefault();

  const locationInput = document.getElementById("location-input");
  const location = locationInput.value.trim();
  locationInput.value = "";

  if (location.length === 0) {
    showLocationError("Empty Search!", "Please enter a location...");
    return;
  } else if (location.length === 1) {
    showLocationError(
      "Short Search!",
      "Search term must be at least 2 characters...",
    );
    return;
  }
  makeSearchResults(location);
});

// Units button
let units = getUnits();
const unitsButton = document.getElementById("change-units");
if (units === "metric") {
  unitsButton.textContent = "Switch To Imperial Units";
} else {
  unitsButton.textContent = "Switch To Metric Units";
}
unitsButton.addEventListener("click", () => {
  toggleUnits();
  location.reload();
});

// Error dialog
function showLocationError(errorTitle, errorBody) {
  const errorHeader = document.getElementById("error-hero");
  errorHeader.textContent = errorTitle;

  const errorText = document.getElementById("error-body");
  errorText.textContent = errorBody;

  const errorPopUp = document.getElementById("error-dialog");
  errorPopUp.showModal();
}
