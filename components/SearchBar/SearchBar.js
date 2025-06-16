export function createSearchBar(onSubmit) {
  const searchBar = document.createElement("form");
  searchBar.classList.add("search-bar");
  searchBar.setAttribute("data-js", "search-bar");

  const input = document.createElement("input");
  input.name = "query";
  input.type = "text";
  input.placeholder = "search characters";
  input.setAttribute("aria-label", "character name");
  input.classList.add("search-bar__input");

  const button = document.createElement("button");
  button.type = "submit";
  button.classList.add("search-bar__button");
  button.setAttribute("aria-label", "search for character");

  const img = document.createElement("img");
  img.src = "assets/magnifying-glass.png";
  img.alt = ""; // empty because of no importance just decorative
  img.classList.add("search-bar__icon");

  button.append(img);
  searchBar.append(input);
  searchBar.append(button);

  // Eventlistener

  searchBar.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent reloading

    const inputValue = event.target.query.value;
    onSubmit({ inputValue });
  });

  return searchBar;
}
