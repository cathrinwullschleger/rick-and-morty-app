import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// dom element for a card to append to the body

// fetch function

async function fetchDataAndRender() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();

  console.log(data);

  const characters = data.results;

  // Clear the card container before adding new cards
  cardContainer.innerHTML = "";

  console.log("name!!!", characters[1].name);

  characters.forEach((character) => {
    const characterCard = createCharacterCard(character);
    cardContainer.append(characterCard);
  });
}

fetchDataAndRender();
