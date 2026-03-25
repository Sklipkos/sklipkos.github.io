document.addEventListener("DOMContentLoaded", () => {
  const slug = getSlugFromUrl();
  if (!slug || !window.speciesData) return;

  const species = window.speciesData.find(item => item.slug === slug);

  if (!species) {
    renderNotFound(slug);
    return;
  }

  renderSpeciesDetail(species);
  initModal();
});

function getSlugFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function getReturnToFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("returnTo");
}

function renderSpeciesDetail(species) {
  document.title = `${species.species} | Sklípkoš`;

  const pageTitle = document.getElementById("pageTitle");
  if (pageTitle) {
    pageTitle.textContent = `${species.species} | Sklípkoš`;
  }

  const header = document.getElementById("speciesHeader");
  if (header) {
    header.innerHTML = species.logo
      ? `<img src="${species.logo}" alt="${species.species} logo">`
      : species.species;
  }

  const photo = document.getElementById("speciesPhoto");
  if (photo) {
    photo.src = species.image || "";
    photo.alt = species.species;
  }

  const info = document.getElementById("speciesInfoContent");
  if (info) {
    info.innerHTML = `
      <p><b>Latinský název:</b> ${species.latinName || "-"}</p>
      ${species.colorForm ? `<p><b>Barevná forma:</b> ${species.colorForm}</p>` : ""}
      ${species.commonName ? `<p><b>Běžný název:</b> ${species.commonName}</p>` : ""}
      ${species.origin ? `<p><b>Původ:</b> ${species.origin}</p>` : ""}
      ${species.type ? `<p><b>Typ:</b> ${species.type}</p>` : ""}
      ${species.adultSize ? `<p><b>Velikost v dospělosti:</b> ${species.adultSize}</p>` : ""}
      ${species.lifespan ? `<p><b>Délka života:</b> ${species.lifespan}</p>` : ""}
    `;
  }

  const charContent = document.getElementById("characteristicsContent");
  if (charContent) {
    charContent.innerHTML = (species.characteristics || []).map(char => `
      <div class="rating">
        ${char.value}
        <div class="tooltip">
          <b>${char.label}</b><br>
          ${char.options.map(option =>
            option === char.value
              ? `<span class="active">${option}</span>`
              : option
          ).join("<br>")}
        </div>
      </div>
    `).join("");
  }

  const desc = document.getElementById("descriptionContent");
  if (desc) {
    desc.innerHTML = (species.description || [])
      .map(text => `<p class="care">${text}</p>`)
      .join("");
  }

  const care = document.getElementById("careContent");
  if (care) {
    care.innerHTML = `
      ${species.care?.terrarium ? `<p><b>Terárium:</b> ${species.care.terrarium}</p>` : ""}
      ${species.care?.hides ? `<p><b>Úkryty:</b> ${species.care.hides}</p>` : ""}
      ${species.care?.temperature ? `<p><b>Teplota:</b> ${species.care.temperature}</p>` : ""}
      ${species.care?.humidity ? `<p><b>Vlhkost:</b> ${species.care.humidity}</p>` : ""}
      ${species.care?.substrate ? `<p><b>Substrát:</b> ${species.care.substrate}</p>` : ""}
    `;
  }

  const feeding = document.getElementById("feedingContent");
  if (feeding) {
    feeding.innerHTML = (species.feeding || [])
      .map(text => `<p class="care">${text}</p>`)
      .join("");
  }

  setupBackLink(species);
}

function setupBackLink(species) {
  const backLink = document.getElementById("backLink");
  if (!backLink) return;

  const returnTo = getReturnToFromUrl();

  if (returnTo) {
    backLink.href = returnTo;
    backLink.textContent = getBackLinkText(returnTo, species);
    return;
  }

  backLink.href = `continents/${species.continent.toLowerCase()}.html`;
  backLink.textContent = `← Zpět`;
}

function getBackLinkText(returnTo, species) {
  if (returnTo.includes("index.html")) {
    return "← Zpět na aktuální nabídku";
  }

  if (returnTo.includes("afrika-druhy.html")) {
    return "← Zpět na všechny africké druhy";
  }

  if (returnTo.includes("amerika-druhy.html")) {
    return "← Zpět na všechny americké druhy";
  }

  if (returnTo.includes("asie-druhy.html")) {
    return "← Zpět na všechny asijské druhy";
  }

  if (returnTo.includes("genera/")) {
    return `← Zpět na detail rodu ${species.genus}`;
  }

  return "← Zpět";
}

function renderNotFound(slug) {
  const info = document.getElementById("speciesInfoContent");
  if (info) {
    info.innerHTML = `
      <p>Druh se slugem <b>${slug}</b> nebyl nalezen.</p>
    `;
  }

  const charContent = document.getElementById("characteristicsContent");
  if (charContent) charContent.innerHTML = "";

  const desc = document.getElementById("descriptionContent");
  if (desc) desc.innerHTML = "";

  const care = document.getElementById("careContent");
  if (care) care.innerHTML = "";

  const feeding = document.getElementById("feedingContent");
  if (feeding) feeding.innerHTML = "";
}

function initModal() {
  const modal = document.getElementById("imgModal");
  if (!modal) return;

  modal.style.display = "none";
  modal.classList.remove("show");

  modal.addEventListener("click", function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

function openModal(img) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  if (!modal || !modalImg) return;

  modalImg.src = img.src;
  modal.style.display = "flex";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("imgModal");
  if (!modal) return;

  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
  }, 350);
}