import { clearMain } from "./clear-main";

export function makeHomeScreen() {
  clearMain();

  const card = document.createElement("div");
  card.id = "home-screen-card";

  const title = document.createElement("h2");
  title.id = "home-screen-hero";
  title.textContent = "Search for a location to continue";

  card.appendChild(title);

  const main = document.querySelector("main");
  main.appendChild(card);
}
