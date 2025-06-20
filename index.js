import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { createSearchBar } from "./components/SearchBar/SearchBar.js";

const navigation = document.querySelector('[data-js="navigation"]');

// initial states

let maxPage = 1; // will be updated later by API (need to be defined, thats why 1 is palceholder)
let currentPage = 1;

let inputValue = ""; // global variable (empty)

// fetch function
async function fetchDataAndRender(page = 1, inputValue = "") {
  // parameters (placeholder with value)
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${inputValue}`
    );
    if (!response.ok) {
      throw new Error("No characters found.");
    }

    const data = await response.json();

    // update max and current page
    currentPage = page;
    maxPage = data.info.pages;

    const characters = data.results;

    // Clear the card container before adding new cards or delete hardcode in html
    cardContainer.innerHTML = "";

    // loop create card for each and append
    characters.forEach((character) => {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);
    });
    // show pagination & catch for error message
    renderPagination();
  } catch (error) {
    cardContainer.innerHTML = `<li>No character can be found according to your search criteria.</li>`;
    currentPage = 1;
    maxPage = 1;
    renderPagination();
    console.error(error); //show error in console
  }
}

fetchDataAndRender();

// searchBar eventListener

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

searchBarContainer.append(createSearchBar)(({ inputValue: query }) => {
  inputValue = query;
  currentPage = 1;
  fetchDataAndRender(currentPage, inputValue); // important currentPage=1 start searching first page // arguments in function for submit event
});

// NavPagination

// show pagination
export function renderPagination() {
  const pagination = document.querySelector('[data-js="pagination"]');
  pagination.textContent = `${currentPage} / ${maxPage}`;
}

const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// logic buttons
nextButton.addEventListener("click", () => {
  if (currentPage < maxPage) {
    fetchDataAndRender(currentPage + 1, inputValue); // Keeps search term and page synced.
  }
});

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    fetchDataAndRender(currentPage - 1, inputValue);
  }
});
