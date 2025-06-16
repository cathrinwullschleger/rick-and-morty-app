import { fetchDataAndRender } from "../../index.js";
import { currentPage } from "../../index.js";
import { maxPage } from "../../index.js";

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
    fetchDataAndRender(currentPage + 1);
  }
});

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    fetchDataAndRender(currentPage - 1);
  }
});
