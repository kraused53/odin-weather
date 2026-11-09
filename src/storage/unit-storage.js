const units_name = "units";

export function getUnits() {
  let units = localStorage.getItem(units_name);

  if (
    // If units were not found
    units === null ||
    // Units are invalid
    !(
      // Only valid if metric or imperial
      (units === "metric" || units === "imperial")
    )
  ) {
    // Store metric units
    localStorage.setItem(units_name, "metric");
    // return metric units. This prevents errors if getUnits is called on a browser that does not allow local storage.
    units = "metric";
  }

  return units;
}

export function toggleUnits() {
  let units = getUnits();

  if (
    // If units were not found
    units === null ||
    // Units are invalid
    !(
      // Only valid if metric or imperial
      (units === "metric" || units === "imperial")
    )
  ) {
    // Store metric units
    localStorage.setItem(units_name, "metric");
    // return metric units. This prevents errors if getUnits is called on a browser that does not allow local storage.
    units = "metric";
  } else {
    // Units are valid. If metric, set to imperial
    if (units === "metric") {
      units = "imperial";
    } else {
      // If imperial, set to metric
      units = "metric";
    }
  }

  // update storage
  localStorage.setItem(units_name, units);
}
