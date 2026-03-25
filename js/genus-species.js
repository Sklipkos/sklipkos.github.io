document.addEventListener("DOMContentLoaded", () => {
  const genusName = document.body.dataset.genus;
  const genusPage = document.body.dataset.genusPage;

  if (!genusName) return;

  renderGenusSpecies(genusName, genusPage);
});

function renderGenusSpecies(genusName, genusPage) {
  if (!window.speciesData) return;

  const container = document.getElementById("genusSpeciesList");
  if (!container) return;

  const genusSpecies = window.speciesData
    .filter(item => item.genus === genusName)
    .sort((a, b) => a.species.localeCompare(b.species, "cs"));

  if (genusSpecies.length === 0) {
    container.innerHTML = "<p>Momentálně u tohoto rodu nemáme žádné chované druhy.</p>";
    return;
  }

  const html = genusSpecies.map(item => {
    const url = getSpeciesDetailUrl(item, genusPage);
    const hasDetail = window.hasSpeciesDetail && window.hasSpeciesDetail(item);

    return `
      <a href="${url}" class="speciesRow speciesLink">
        <span class="speciesNameWrap">
          <span class="speciesName">${item.species}</span>
          ${hasDetail ? `<span class="speciesInfoBadge" title="Detail druhu dostupný">i</span>` : ""}
        </span>
      </a>
    `;
  }).join("");

  container.innerHTML = html;
}

function getSpeciesDetailUrl(species, returnTo) {
  if (species.slug) {
    return `../../species-detail.html?slug=${species.slug}&returnTo=${encodeURIComponent(returnTo || "")}`;
  }

  return "../../coming-soon.html";
}