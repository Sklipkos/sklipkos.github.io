document.addEventListener("DOMContentLoaded", () => {
  if (!window.speciesData) return;

  const americaSpecies = window.speciesData
    .filter(item => item.continent === "Amerika")
    .sort((a, b) => a.species.localeCompare(b.species, "cs"));

  // jen pokud existují rody (amerika.html)
  if (document.querySelector(".genusCard")) {
    updateGenusCounts(americaSpecies);
  }

  // jen pokud existuje seznam druhů (amerika-druhy.html)
  if (document.getElementById("americaSpeciesList")) {
    renderAmericaSpeciesList(americaSpecies);
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

function renderAmericaSpeciesList(speciesList) {
  const container = document.getElementById("americaSpeciesList");
  if (!container) return;

  const html = speciesList.map(item => {
  const url = getSpeciesDetailUrl(item, "continents/amerika-druhy.html");
  const hasDetail = window.hasSpeciesDetail && window.hasSpeciesDetail(item);

  return `
    <a href="${url}" class="speciesRow speciesLink">
      <span class="speciesNameWrap">
        <span class="speciesName">${item.species}</span>
        ${hasDetail ? `<span class="speciesInfoBadge" title="Detail druhu dostupný">i</span>` : ""}
      </span>
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