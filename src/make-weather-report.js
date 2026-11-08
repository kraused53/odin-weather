import { clearMain } from "./clear-main";
import {
  getIconSVG,
  getIconTitle,
  getThermometerIcon,
  getWindIcon,
} from "./get-icon";
import { getWeatherReport } from "./weather-api";

/* Weather Screen */
export async function makeWeatherScreen(city) {
  clearMain();

  const report = await getWeatherReport(city.latitude, city.longitude);

  /* Divs */
  const reportDiv = document.createElement("div");
  reportDiv.id = "report-div";

  const infoDiv = makeInfoDiv(city);
  const hoursDiv = makeHoursDiv(report);
  const currentDiv = makeCurrentDiv(report);
  const weekDiv = makeWeekDiv(report);

  /* Pack */
  reportDiv.appendChild(infoDiv);
  reportDiv.appendChild(hoursDiv);
  reportDiv.appendChild(currentDiv);
  reportDiv.appendChild(weekDiv);

  const main = document.querySelector("main");
  main.appendChild(reportDiv);
}

/* Info Div */
function makeInfoDiv(city) {
  const infoDiv = document.createElement("div");
  infoDiv.id = "info-div";
  infoDiv.className = "report-div";

  const infoTitle = document.createElement("p");
  infoTitle.id = "report-info-title";
  infoTitle.className = "report-title";
  infoTitle.textContent = `Weather For`;

  const info = document.createElement("p");
  info.id = "report-info";
  info.className = "report-data";
  info.textContent = `${city.name}`;
  console.log(city);
  infoDiv.appendChild(infoTitle);
  infoDiv.appendChild(info);

  return infoDiv;
}

/* Hours Div */
function makeHoursDiv(report) {
  const hoursDiv = document.createElement("div");
  hoursDiv.id = "hours-div";
  hoursDiv.className = "report-div";

  return hoursDiv;
}

/* Current Div */
function makeCurrentDiv(report) {
  const currentDiv = document.createElement("div");
  currentDiv.id = "current-div";
  currentDiv.className = "report-div";

  const iconDiv = makeIconDiv(report);
  const currentTempDiv = makeCurrentTempDiv(report);
  const windDiv = makeWindDiv(report);
  const sunDiv = makeSunDiv(report);

  currentDiv.appendChild(iconDiv);
  currentDiv.appendChild(currentTempDiv);
  currentDiv.appendChild(windDiv);
  currentDiv.appendChild(sunDiv);

  return currentDiv;
}

function makeIconDiv(report) {
  const iconDiv = document.createElement("div");
  iconDiv.id = "icon-div";
  iconDiv.className = "report-div";

  const iconTitle = document.createElement("p");
  iconTitle.id = "icon-title";
  iconTitle.textContent = getIconTitle(report.current.weather_code);

  const icon = document.createElement("div");
  icon.id = "icon";
  icon.append(getIconSVG(report.current.weather_code, report.current.is_day));
  icon.classList.add("large-icon");

  iconDiv.appendChild(icon);
  iconDiv.appendChild(iconTitle);

  return iconDiv;
}

function makeCurrentTempDiv(report) {
  const tempDiv = document.createElement("div");
  tempDiv.id = "temp-div";
  tempDiv.className = "report-div";

  // Temp Icon
  const tempIcon = getThermometerIcon();

  // Current Temp
  const currentTempDiv = document.createElement("div");
  currentTempDiv.id = "current-temp-div";
  currentTempDiv.className = "temp-data-div";

  const currentTempTitle = document.createElement("p");
  currentTempTitle.id = "current-temp-title";
  currentTempTitle.className = "report-title";
  currentTempTitle.textContent = "Current";

  const currentTemp = document.createElement("p");
  currentTemp.id = "current-temp";
  currentTemp.className = "report-data";
  currentTemp.textContent = `${report.current.temperature_2m} ${report.current_units.temperature_2m}`;

  currentTempDiv.appendChild(currentTempTitle);
  currentTempDiv.appendChild(currentTemp);

  // High Temp
  const highTempDiv = document.createElement("div");
  highTempDiv.id = "high-temp-div";
  highTempDiv.className = "temp-data-div";

  const highTempTitle = document.createElement("p");
  highTempTitle.id = "high-temp-title";
  highTempTitle.className = "report-title";
  highTempTitle.textContent = "High";

  const highTemp = document.createElement("p");
  highTemp.id = "high-temp";
  highTemp.className = "report-data";
  highTemp.textContent = `${report.daily.temperature_2m_max[0]} ${report.daily_units.temperature_2m_max}`;

  // Low Temp
  const lowTempDiv = document.createElement("div");
  lowTempDiv.id = "low-temp-div";
  lowTempDiv.className = "temp-data-div";

  const lowTempTitle = document.createElement("p");
  lowTempTitle.id = "low-temp-title";
  lowTempTitle.className = "report-title";
  lowTempTitle.textContent = "Low";

  const lowTemp = document.createElement("p");
  lowTemp.id = "high-temp";
  lowTemp.className = "report-data";
  lowTemp.textContent = `${report.daily.temperature_2m_min[0]} ${report.daily_units.temperature_2m_min}`;

  // Pack
  currentTempDiv.appendChild(currentTempTitle);
  currentTempDiv.appendChild(currentTemp);
  highTempDiv.appendChild(highTempTitle);
  highTempDiv.appendChild(highTemp);
  lowTempDiv.appendChild(lowTempTitle);
  lowTempDiv.appendChild(lowTemp);

  tempDiv.appendChild(tempIcon);
  tempDiv.appendChild(currentTempDiv);
  tempDiv.appendChild(highTempDiv);
  tempDiv.appendChild(lowTempDiv);
  return tempDiv;
}

function makeWindDiv(report) {
  const windDiv = document.createElement("div");
  windDiv.id = "wind-div";
  windDiv.className = "report-div";

  const windIcon = getWindIcon();

  windDiv.appendChild(windIcon);
  return windDiv;
}

function makeSunDiv(report) {
  const sunDiv = document.createElement("div");
  sunDiv.id = "sun-div";
  sunDiv.className = "report-div";

  return sunDiv;
}

/* Week Div */
function makeWeekDiv(report) {
  const weekDiv = document.createElement("div");
  weekDiv.id = "week-div";
  weekDiv.className = "report-div";

  return weekDiv;
}

async function makeWeatherScreenOld(city) {
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

  controlsDiv.appendChild(saveButton);
  controlsDiv.appendChild(unitsButton);
  reportDiv.appendChild(controlsDiv);

  const main = document.querySelector("main");
  main.appendChild(reportDiv);
}
