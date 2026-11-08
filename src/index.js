import { makeHomeScreen } from "./home-screen";
import { makeSearchResults } from "./search-results";
import "./styles.css";

makeHomeScreen();

// Link search button to geocoding api
const locationSearch = document.getElementById("location-search");
locationSearch.addEventListener("submit", (event) => {
  event.preventDefault();

  const locationInput = document.getElementById("location-input");
  const location = locationInput.value.trim();
  locationInput.value = "";

  if (location.length == 0) {
    showLocationError("Empty Search!", "Please enter a location...");
    return;
  }
  makeSearchResults(location);
});

function showLocationError(errorTitle, errorBody) {
  const errorHeader = document.getElementById("error-hero");
  errorHeader.textContent = errorTitle;

  const errorText = document.getElementById("error-body");
  errorText.textContent = errorBody;

  const errorPopUp = document.getElementById("error-dialog");
  errorPopUp.showModal();
}
