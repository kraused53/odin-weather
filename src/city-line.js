import { makeWeatherScreen } from "./make-weather-report";

export function makeCityLine(city) {
  const cityLine = document.createElement("div");
  cityLine.className = "city-line";

  // Groups
  const cityInfoGroup = document.createElement("div");
  cityInfoGroup.className = "city-info-group outline";

  const cityNameGroup = document.createElement("div");
  cityNameGroup.className = "city-name-group outline";

  const cityAdminGroup = document.createElement("div");
  cityAdminGroup.className = "city-admin-group outline";

  const cityCountryGroup = document.createElement("div");
  cityCountryGroup.className = "city-country-group outline";

  const cityLocationGroup = document.createElement("div");
  cityLocationGroup.className = "city-location-group outline";

  const cityLatGroup = document.createElement("div");
  cityLatGroup.className = "city-lat-group";

  const cityLonGroup = document.createElement("div");
  cityLonGroup.className = "city-lon-group";

  const cityControlsGroup = document.createElement("div");
  cityControlsGroup.className = "city-controls-group outline";

  // Titles
  const cityInfoTitle = document.createElement("p");
  cityInfoTitle.className = "city-information-title line-title";
  cityInfoTitle.textContent = "Information";

  const cityNameTitle = document.createElement("p");
  cityNameTitle.className = "city-name-title line-title";
  cityNameTitle.textContent = "Name";

  const cityAdminTitle = document.createElement("p");
  cityAdminTitle.className = "city-name-title line-title";
  cityAdminTitle.textContent = "Admin";

  const cityCountryTitle = document.createElement("p");
  cityCountryTitle.className = "city-country-title line-title";
  cityCountryTitle.textContent = "Country";

  const cityLocationTitle = document.createElement("p");
  cityLocationTitle.className = "city-location-title line-title";
  cityLocationTitle.textContent = "Location";

  const cityLatTitle = document.createElement("p");
  cityLatTitle.className = "city-lat-title line-title";
  cityLatTitle.textContent = "Latitude";

  const cityLonTitle = document.createElement("p");
  cityLonTitle.className = "city-lon-title line-title";
  cityLonTitle.textContent = "Longitude";

  // Data
  const cityName = document.createElement("p");
  cityName.className = "city-name";
  cityName.textContent = city.name;

  const cityAdmin = document.createElement("p");
  cityAdmin.className = "city-admin";
  cityAdmin.textContent = city.admin1;

  const cityCountry = document.createElement("p");
  cityCountry.className = "city-country";
  cityCountry.textContent = city.country_code;

  const cityLat = document.createElement("p");
  cityLat.className = "city-lat";
  cityLat.textContent = city.latitude;

  const cityLon = document.createElement("p");
  cityLon.className = "city-lon";
  cityLon.textContent = city.longitude;

  // Controls
  const selectButton = document.createElement("button");
  selectButton.type = "button";
  selectButton.className = "city-line-select-button";
  selectButton.textContent = "Use this location";
  selectButton.addEventListener("click", () => {
    makeWeatherScreen(city);
  });

  // Pack
  cityNameGroup.appendChild(cityNameTitle);
  cityNameGroup.appendChild(cityName);

  cityAdminGroup.appendChild(cityAdminTitle);
  cityAdminGroup.appendChild(cityAdmin);

  cityCountryGroup.appendChild(cityCountryTitle);
  cityCountryGroup.appendChild(cityCountry);

  cityInfoGroup.appendChild(cityNameGroup);
  cityInfoGroup.appendChild(cityAdminGroup);
  cityInfoGroup.appendChild(cityCountryGroup);
  cityInfoGroup.appendChild(cityInfoTitle);

  cityLatGroup.appendChild(cityLatTitle);
  cityLatGroup.appendChild(cityLat);

  cityLonGroup.appendChild(cityLonTitle);
  cityLonGroup.appendChild(cityLon);

  cityLocationGroup.appendChild(cityLocationTitle);
  cityLocationGroup.appendChild(cityLatGroup);
  cityLocationGroup.appendChild(cityLonGroup);

  cityControlsGroup.appendChild(selectButton);

  cityLine.appendChild(cityInfoGroup);
  cityLine.appendChild(cityLocationGroup);
  cityLine.appendChild(cityControlsGroup);

  return cityLine;
}
