import { getUnits } from "./storage/unit-storage";

export async function getWeatherReport(lat, lon, tz) {
  let units = getUnits();

  // Define units as metric first (api defaults to metric, so metric-units are an empty string, lol)
  let precip_units = "";
  let wind_speed_units = "";
  let temperature_units = "";

  // If user is using imperial
  if (units === "imperial") {
    precip_units = "&precipitation_unit=inch";
    wind_speed_units = "&wind_speed_unit=mph";
    temperature_units = "&temperature_unit=fahrenheit";
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunset,sunrise,weather_code,temperature_2m_max,temperature_2m_min&hourly=is_day,temperature_2m,weather_code&current=is_day,precipitation_probability,temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=${tz}${temperature_units}${wind_speed_units}${precip_units}`;

  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Weather Report: \n`, result);

    return result;
  } catch (error) {
    console.error(error.message);
  }
}
