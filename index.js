import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { renderPagination } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');

const searchQuery = "";
const navigation = document.querySelector('[data-js="navigation"]');

// initial states
export let maxPage = 1; // will be updated later by API (need to be defined, thats why 1 as palceholder)
export let currentPage = 1;

// fetch function
export async function fetchDataAndRender(page = 1) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();

  // update max and current page
  currentPage = page;
  maxPage = data.info.pages;

  console.log(data);

  const characters = data.results;

  // Clear the card container before adding new cards
  cardContainer.innerHTML = "";

  console.log("name!!!", characters[1].name);

  // loop create card for each and append
  characters.forEach((character) => {
    const characterCard = createCharacterCard(character);
    cardContainer.append(characterCard);
  });
  // show pagination
  renderPagination();
}

fetchDataAndRender();
