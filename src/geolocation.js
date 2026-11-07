export async function searchCities(location) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&language=en&format=json`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Search Results: \n`, result.results);

    return result.results;
  } catch (error) {
    console.error(error.message);
  }
}
