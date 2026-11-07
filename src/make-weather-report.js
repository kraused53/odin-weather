import { clearMain } from "./clear-main";
import { getIconSVG, getIconTitle } from "./get-icon";
import { makeSearchBar } from "./search-bar";
import { getWeatherReport } from "./weather-api";

export async function makeWeatherScreen(city) {
  clearMain();

  const report = await getWeatherReport(city.latitude, city.longitude);

  /* Divs */
  const reportDiv = document.createElement("div");
  reportDiv.id = "report-div";

  const iconDiv = document.createElement("div");
  iconDiv.id = "icon-div";

  const tempDiv = document.createElement("div");
  tempDiv.id = "temp-div";
  tempDiv.className = "report-div";

  const humDiv = document.createElement("div");
  humDiv.id = "hum-div";
  humDiv.className = "report-div";

  const precipDiv = document.createElement("div");
  precipDiv.id = "precip-div";
  precipDiv.className = "report-div";

  const windDiv = document.createElement("div");
  windDiv.id = "wind-div";
  windDiv.className = "report-div";

  const controlsDiv = document.createElement("div");
  controlsDiv.id = "controls-div";

  /* Titles */
  const tempTitle = document.createElement("p");
  tempTitle.id = "temp-title";
  tempTitle.className = "report-title";
  tempTitle.textContent = "Temperature";

  const humTitle = document.createElement("p");
  humTitle.id = "hum-title";
  humTitle.className = "report-title";
  humTitle.textContent = "Humidity";

  const precipTitle = document.createElement("p");
  precipTitle.id = "precip-title";
  precipTitle.className = "report-title";
  precipTitle.textContent = "Preciptitaion";

  const windSpeedTitle = document.createElement("p");
  windSpeedTitle.id = "wind-speed-title";
  windSpeedTitle.className = "report-title";
  windSpeedTitle.textContent = "Wind Speed";

  const windDirTitle = document.createElement("p");
  windDirTitle.id = "wind-dir-title";
  windDirTitle.className = "report-title";
  windDirTitle.textContent = "Wind Direction";

  const iconTitle = document.createElement("p");
  iconTitle.id = "icon-title";
  iconTitle.textContent = getIconTitle(report.current.weather_code);

  /* Data */
  const temp = document.createElement("p");
  temp.id = "report-temp";
  temp.className = "report-data";
  temp.textContent = `${report.current.temperature_2m} ${report.current_units.temperature_2m}`;

  const hum = document.createElement("p");
  hum.id = "report-hum";
  hum.className = "report-data";
  hum.textContent = `${report.current.relative_humidity_2m} ${report.current_units.relative_humidity_2m}`;

  const precip = document.createElement("p");
  precip.id = "report-precip";
  precip.className = "report-data";
  precip.textContent = `${report.current.precipitation_probability} ${report.current_units.precipitation_probability}`;

  const windSpeed = document.createElement("p");
  windSpeed.id = "report-wind-speed";
  windSpeed.className = "report-data";
  windSpeed.textContent = `${report.current.wind_speed_10m} ${report.current_units.wind_speed_10m}`;

  const windDir = document.createElement("p");
  windDir.id = "report-wind-dir";
  windDir.className = "report-data";
  windDir.textContent = `${report.current.wind_direction_10m} ${report.current_units.wind_direction_10m}`;

  const icon = document.createElement("div");
  icon.id = "icon";
  icon.append(getIconSVG(report.current.weather_code, report.current.is_day));

  /* Controls */
  const newSearchButton = document.createElement("button");
  newSearchButton.id = "new-search-button";
  newSearchButton.type = "button";
  newSearchButton.className = "report-button";
  newSearchButton.textContent = "Home";
  newSearchButton.addEventListener("click", () => {
    makeSearchBar();
  });

  const saveButton = document.createElement("button");
  saveButton.id = "save-button";
  saveButton.type = "button";
  saveButton.className = "report-button";
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => {
    console.log("Oops, check back later");
  });

  const unitsButton = document.createElement("button");
  unitsButton.id = "units-button";
  unitsButton.type = "button";
  unitsButton.className = "report-button";
  unitsButton.textContent = "Units";
  unitsButton.addEventListener("click", () => {
    console.log("Oops, check back later");
  });

  /* Pack */
  iconDiv.appendChild(icon);
  iconDiv.appendChild(iconTitle);
  reportDiv.appendChild(iconDiv);

  tempDiv.appendChild(tempTitle);
  tempDiv.appendChild(temp);
  reportDiv.appendChild(tempDiv);

  humDiv.appendChild(humTitle);
  humDiv.appendChild(hum);
  reportDiv.appendChild(humDiv);

  precipDiv.appendChild(precipTitle);
  precipDiv.appendChild(precip);
  reportDiv.appendChild(precipDiv);

  windDiv.appendChild(windSpeedTitle);
  windDiv.appendChild(windSpeed);
  windDiv.appendChild(windDirTitle);
  windDiv.appendChild(windDir);
  reportDiv.appendChild(windDiv);

  controlsDiv.appendChild(newSearchButton);
  controlsDiv.appendChild(saveButton);
  controlsDiv.appendChild(unitsButton);
  reportDiv.appendChild(controlsDiv);

  const main = document.querySelector("main");
  main.appendChild(reportDiv);
}
