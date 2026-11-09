import { clearMain } from "./clear-main";
import {
  getIconSVG,
  getIconTitle,
  getThermometerIcon,
  getWindIcon,
  getSunriseIcon,
  getSunsetIcon,
} from "./get-icon";
import { getWeatherReport } from "./weather-api";
import { parseISO, format } from "date-fns";

import "./css/weather-report.css";

/* Weather Screen */
export async function makeWeatherScreen(city) {
  clearMain();

  const report = await getWeatherReport(
    city.latitude,
    city.longitude,
    city.timezone,
  );

  /* Divs */
  const reportDiv = document.createElement("div");
  reportDiv.id = "report-div";

  const infoDiv = makeInfoDiv(city);
  const hoursDiv = makeHoursDiv(report);
  const todayDiv = makeTodayDiv(report);
  const weekDiv = makeWeekDiv(report);

  /* Pack */
  reportDiv.appendChild(infoDiv);
  reportDiv.appendChild(hoursDiv);
  reportDiv.appendChild(todayDiv);
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
  info.className = "report-div";
  info.textContent = `${city.name}`;
  if (Object.hasOwn(city, "admin1")) {
    info.textContent += `, ${city.admin1}`;
  }
  info.textContent += `\n[${city.country_code}]`;
  console.log(city);
  infoDiv.appendChild(infoTitle);
  infoDiv.appendChild(info);

  return infoDiv;
}

/* Today Div */
function makeTodayDiv(report) {
  const todayDiv = document.createElement("div");
  todayDiv.id = "today-div";
  todayDiv.className = "report-div";

  const todayTitle = document.createElement("p");
  todayTitle.id = "today-title";
  todayTitle.textContent = "Today's Weather";

  const iconDiv = makeIconDiv(report);
  const tempDiv = makeTempDiv(report);
  const windDiv = makeWindDiv(report);
  const sunDiv = makeSunDiv(report);

  todayDiv.appendChild(todayTitle);
  todayDiv.appendChild(iconDiv);
  todayDiv.appendChild(tempDiv);
  todayDiv.appendChild(windDiv);
  todayDiv.appendChild(sunDiv);

  return todayDiv;
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

function makeTempDiv(report) {
  const tempDiv = document.createElement("div");
  tempDiv.id = "temp-div";
  tempDiv.className = "report-div";

  // Temp Icon
  const tempIcon = getThermometerIcon();

  // Current Temp
  const currentTempDiv = document.createElement("div");
  currentTempDiv.id = "current-temp-div";
  currentTempDiv.className = "report-data-div";

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
  highTempDiv.className = "report-data-div";

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
  lowTempDiv.className = "report-data-div";

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

  // Icon
  const iconDiv = document.createElement("div");
  iconDiv.id = "wind-icon-div";
  iconDiv.className = "report-data-div";

  const iconTitle = document.createElement("p");
  iconTitle.id = "wind-icon-title";
  iconTitle.className = "report-title";
  iconTitle.textContent = "Wind";

  const windIcon = getWindIcon();

  iconDiv.appendChild(windIcon);
  iconDiv.appendChild(iconTitle);

  // Speed
  const speedDiv = document.createElement("div");
  speedDiv.id = "wind-speed-div";
  speedDiv.className = "report-data-div";

  const speedTitle = document.createElement("p");
  speedTitle.id = "wind-speed-title";
  speedTitle.className = "report-title";
  speedTitle.textContent = "Speed";

  const speed = document.createElement("p");
  speed.id = "wind-speed";
  speed.className = "report-data";
  speed.textContent = `${report.current.wind_speed_10m} ${report.current_units.wind_speed_10m}`;

  speedDiv.appendChild(speedTitle);
  speedDiv.appendChild(speed);

  // Gusts
  const gustsDiv = document.createElement("div");
  gustsDiv.id = "wind-gusts-div";
  gustsDiv.className = "report-data-div";

  const gustsTitle = document.createElement("p");
  gustsTitle.id = "wind-gusts-title";
  gustsTitle.className = "report-title";
  gustsTitle.textContent = "Gusts";

  const gusts = document.createElement("p");
  gusts.id = "wind-gusts";
  gusts.className = "report-data";
  gusts.textContent = `${report.current.wind_gusts_10m} ${report.current_units.wind_gusts_10m}`;

  gustsDiv.appendChild(gustsTitle);
  gustsDiv.appendChild(gusts);

  // Direction
  const directionDiv = document.createElement("div");
  directionDiv.id = "wind-direction-div";
  directionDiv.className = "report-data-div";

  const directionTitle = document.createElement("p");
  directionTitle.id = "wind-direction-title";
  directionTitle.className = "report-title";
  directionTitle.textContent = "Direction";

  const direction = document.createElement("p");
  direction.id = "wind-direction";
  direction.className = "report-data";
  direction.textContent = `${report.current.wind_direction_10m} ${report.current_units.wind_direction_10m}`;

  directionDiv.appendChild(directionTitle);
  directionDiv.appendChild(direction);

  // Pack
  windDiv.appendChild(iconDiv);
  windDiv.appendChild(speedDiv);
  windDiv.appendChild(gustsDiv);
  windDiv.appendChild(directionDiv);

  return windDiv;
}

function makeSunDiv(report) {
  // Get time data
  const sr = report.daily.sunrise[0];
  const sr_time = parseISO(sr);
  const ss = report.daily.sunset[0];
  const ss_time = parseISO(ss);

  const sunDiv = document.createElement("div");
  sunDiv.id = "sun-div";
  sunDiv.className = "report-div";

  // Sunrise
  const riseDiv = document.createElement("div");
  riseDiv.id = "sunrise-div";
  riseDiv.className = "report-sun-div";

  const riseIconDiv = document.createElement("div");
  riseIconDiv.id = "sunrise-icon-div";
  riseIconDiv.className = "report-data-div";

  const riseIcon = getSunriseIcon();

  riseIconDiv.appendChild(riseIcon);

  const riseTimeDiv = document.createElement("div");
  riseTimeDiv.id = "sunrise-time-div";
  riseTimeDiv.className = "report-data-div";

  const riseTimeTitle = document.createElement("p");
  riseTimeTitle.className = "report-title";
  riseTimeTitle.textContent = "Sunrise";

  const riseTime = document.createElement("p");
  riseTime.id = "sunrise-time";
  riseTime.className = "report-data";
  riseTime.textContent = format(sr_time, "h:mm a");

  riseTimeDiv.appendChild(riseTimeTitle);
  riseTimeDiv.appendChild(riseTime);

  riseDiv.appendChild(riseIconDiv);
  riseDiv.appendChild(riseTimeDiv);

  // Sunset
  const setDiv = document.createElement("div");
  setDiv.id = "sunset-div";
  setDiv.className = "report-sun-div";

  const setIconDiv = document.createElement("div");
  setIconDiv.id = "sunset-icon-div";
  setIconDiv.className = "report-data-div";

  const setIcon = getSunsetIcon();

  setIconDiv.appendChild(setIcon);

  const setTimeDiv = document.createElement("div");
  setTimeDiv.id = "sunset-time-div";
  setTimeDiv.className = "report-data-div";

  const setTimeTitle = document.createElement("p");
  setTimeTitle.className = "report-title";
  setTimeTitle.textContent = "Sunset";

  const setTime = document.createElement("p");
  setTime.id = "sunset-time";
  setTime.className = "report-data";
  setTime.textContent = format(ss_time, "h:mm a");

  setTimeDiv.appendChild(setTimeTitle);
  setTimeDiv.appendChild(setTime);

  setDiv.appendChild(setIconDiv);
  setDiv.appendChild(setTimeDiv);

  // Pack
  sunDiv.appendChild(riseDiv);
  sunDiv.appendChild(setDiv);

  return sunDiv;
}

/* Week Div */
function makeWeekDiv(report) {
  const weekDiv = document.createElement("div");
  weekDiv.id = "week-div";
  weekDiv.className = "report-div";

  const weekTitle = document.createElement("p");
  weekTitle.id = "week-title";
  weekTitle.textContent = "This Week";

  const weekData = makeWeekCards(report);

  // Pack
  weekDiv.appendChild(weekTitle);
  weekDiv.appendChild(weekData);

  return weekDiv;
}

function makeWeekCards(report) {
  const weekDataDiv = document.createElement("div");
  weekDataDiv.id = "week-data-div";
  weekDataDiv.className = "report-div";

  for (let i = 0; i < 7; i++) {
    weekDataDiv.appendChild(
      makeDayCard(
        report.daily.time[i],
        report.daily.weather_code[i],
        report.daily.temperature_2m_max[i],
        report.daily.temperature_2m_min[i],
        report.daily_units.temperature_2m_max,
      ),
    );
  }

  return weekDataDiv;
}

function makeDayCard(dayDate, icon, dayHigh, dayLow, dayTempUnits) {
  const dayDiv = document.createElement("div");
  dayDiv.id = crypto.randomUUID();
  dayDiv.className = "day-div";

  // Divs
  const dayIconDiv = document.createElement("div");
  dayIconDiv.id = "icon-div-" + dayDiv.id;
  dayIconDiv.className = "day-icon-div";

  const dayTempDiv = document.createElement("div");
  dayTempDiv.id = "temp-div-" + dayDiv.id;
  dayTempDiv.className = "day-temp-div";

  const dayHighDiv = document.createElement("div");
  dayHighDiv.id = "high-div-" + dayDiv.id;
  dayHighDiv.className = "report-data-div";

  const dayLowDiv = document.createElement("div");
  dayLowDiv.id = "low-div-" + dayDiv.id;
  dayLowDiv.className = "report-data-div";

  const dayDateDiv = document.createElement("div");
  dayDateDiv.id = "date-div-" + dayDiv.id;
  dayDateDiv.className = "day-date-div";

  // Titles
  const dayHighTitle = document.createElement("p");
  dayHighTitle.classList.add("day-title");
  dayHighTitle.textContent = "High";

  const dayLowTitle = document.createElement("p");
  dayLowTitle.classList.add("day-title");
  dayLowTitle.textContent = "Low";

  // Data
  const dayIcon = getIconSVG(icon, 1);
  dayIcon.id = "icon-" + dayDiv.id;
  dayIcon.classList.add("small-icon");

  const dateOfDay = document.createElement("div");
  dateOfDay.id = "date-" + dayDiv.id;
  dateOfDay.textContent = format(parseISO(dayDate), "MMM do, yyyy");
  dateOfDay.classList.add("day-date");

  const high = document.createElement("div");
  high.id = "high-" + dayDiv.id;
  high.textContent = `${dayHigh} ${dayTempUnits}`;
  high.classList.add("day-high");

  const low = document.createElement("div");
  low.id = "low-" + dayDiv.id;
  low.textContent = `${dayLow} ${dayTempUnits}`;
  low.classList.add("day-low");

  // Pack
  dayIconDiv.appendChild(dayIcon);
  dayDiv.appendChild(dayIconDiv);

  dayLowDiv.appendChild(dayLowTitle);
  dayLowDiv.appendChild(low);
  dayHighDiv.appendChild(dayHighTitle);
  dayHighDiv.appendChild(high);
  dayTempDiv.appendChild(dayLowDiv);
  dayTempDiv.appendChild(dayHighDiv);
  dayDiv.appendChild(dayTempDiv);

  dayDateDiv.appendChild(dateOfDay);
  dayDiv.appendChild(dayDateDiv);

  return dayDiv;
}

/* Hours */
function makeHoursDiv(report) {
  const hoursDiv = document.createElement("div");
  hoursDiv.id = "hours-div";
  hoursDiv.className = "report-div";

  const hoursTitle = document.createElement("p");
  hoursTitle.id = "report-hours-title";
  hoursTitle.className = "report-title";
  hoursTitle.textContent = `A Look At Today`;

  const hoursData = makeHourCards(report);

  hoursDiv.appendChild(hoursTitle);
  hoursDiv.appendChild(hoursData);
  return hoursDiv;
}

function makeHourCards(report) {
  const hourDataDiv = document.createElement("div");
  hourDataDiv.id = "hour-data-div";
  hourDataDiv.className = "report-div";

  for (let i = 0; i < 24; i++) {
    hourDataDiv.appendChild(
      makeHourCard(
        report.hourly.weather_code[i],
        report.hourly.is_day[i],
        report.hourly.time[i],
        report.hourly.temperature_2m[i],
        report.hourly_units.temperature_2m,
      ),
    );
  }

  return hourDataDiv;
}

function makeHourCard(
  hourIconCode,
  hourIsDay,
  hourTime,
  hourTemp,
  hourTempUnits,
) {
  // Parse Data
  const ht = parseISO(hourTime);

  const hourCard = document.createElement("div");
  hourCard.id = crypto.randomUUID();
  hourCard.className = "hour-div";

  // Data
  const hourIcon = getIconSVG(hourIconCode, hourIsDay);
  hourIcon.id = "icon-" + hourCard.id;
  hourIcon.classList.add("tiny-icon");

  const hourTimeData = document.createElement("div");
  hourTimeData.id = "time-data-" + hourCard.id;
  hourTimeData.className = "hour-time-data";
  hourTimeData.textContent = format(ht, "h:mm a");

  const hourTempData = document.createElement("div");
  hourTempData.id = "temp-data-" + hourCard.id;
  hourTempData.className = "hour-temp-data";
  hourTempData.textContent = `${hourTemp} ${hourTempUnits}`;

  // Pack
  hourCard.appendChild(hourIcon);
  hourCard.appendChild(hourTempData);
  hourCard.appendChild(hourTimeData);

  return hourCard;
}
