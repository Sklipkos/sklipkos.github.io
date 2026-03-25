document.addEventListener("DOMContentLoaded", () => {
  if (!window.speciesData) return;

  const asiaSpecies = window.speciesData
    .filter(item => item.continent === "Asie")
    .sort((a, b) => a.species.localeCompare(b.species, "cs"));

  // jen pokud existují rody (asie.html)
  if (document.querySelector(".genusCard")) {
    updateGenusCounts(asiaSpecies);
  }

  // jen pokud existuje seznam druhů (asie-druhy.html)
  if (document.getElementById("asiaSpeciesList")) {
    renderAsiaSpeciesList(asiaSpecies);
  }
});

function updateGenusCounts(speciesList) {
  const genusCards = document.querySelectorAll(".genusCard[data-genus]");

  genusCards.forEach(card => {
    const genus = card.dataset.genus;
    const countSpan = card.querySelector(".genusCount");

    const count = speciesList.filter(item => item.genus === genus).length;

    if (countSpan) {
      countSpan.textContent = count > 0 ? `(${count})` : "";
    }
  });
}

function renderAsiaSpeciesList(speciesList) {
  const container = document.getElementById("asiaSpeciesList");
  if (!container) return;

  const html = speciesList.map(item => {
    const url = getSpeciesDetailUrl(item, "continents/asie-druhy.html");

    return `
      <a href="${url}" class="speciesRow speciesLink">
        <span class="speciesName">${item.species}</span>
        <span class="speciesGenus">${item.genus}</span>
      </a>
    `;
  }).join("");

  container.innerHTML = html;
}

function getSpeciesDetailUrl(species, returnTo) {
  if (species.slug) {
    return `../species-detail.html?slug=${species.slug}&returnTo=${encodeURIComponent(returnTo)}`;
  }

  return "../coming-soon.html";
}