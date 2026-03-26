document.addEventListener("DOMContentLoaded", () => {
  if (!window.speciesData) return;

  const allSpecies = window.speciesData
    .slice()
    .sort((a, b) => a.species.localeCompare(b.species, "cs"));

  if (document.getElementById("allSpeciesList")) {
    renderAllSpeciesList(allSpecies);
  }
});

function renderAllSpeciesList(speciesList) {
  const container = document.getElementById("allSpeciesList");
  if (!container) return;

  const html = speciesList.map(item => {
  const url = getSpeciesDetailUrl(item, "continents/vsechny-druhy.html");
  const hasDetail = window.hasSpeciesDetail && window.hasSpeciesDetail(item);

  return `
  <a href="${url}" class="speciesRow speciesLink speciesRowWide">
    <span class="speciesNameWrap">
      <span class="speciesName">${item.species}</span>
      ${hasDetail ? `<span class="speciesInfoBadge" title="Detail druhu dostupný">i</span>` : ""}
    </span>
    <span class="speciesContinent">${item.continent}</span>
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