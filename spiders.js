const spiders = [

{
    name: "Heterothele gabonensis",
    sex: "Samice",
    size: "adult",
    price: "800 Kč",
    continent: "Afrika"
},

{
    name: "Psalmopoeus irminia",
    sex: "Samice",
    size: "3.5 cm",
    price: "700 Kč",
    continent: "Amerika"
},

{
    name: "Psalmopoeus reduncus",
    sex: "Samice",
    size: "adult",
    price: "800 Kč",
    continent: "Amerika"
},





{
    name: "Phormictopus auratus",
    sex: "Samec",
    size: "adult",
    price: "600 Kč",
    continent: "Amerika"
},

{
    name: "Psalmopoeus reduncus",
    sex: "Samec",
    size: "4 cm",
    price: "400 Kč",
    continent: "Asie"
},






{
    name: "Chilobrachys sp. Vietnam Blue",
    sex: "Neurčené",
    size: "1.svlek",
    price: "80 Kč/kus",
    continent: "Asie"
},

{
    name: "Heteroscodra maculata",
    sex: "Neurčené",
    size: "5. slvek",
    price: "150 Kč/kus",
    continent: "Afrika"
},

{
    name: "Ornithoctonus aureotibialis",
    sex: "Neurčené",
    size: "2.svlek",
    price: "100 Kč/kus",
    continent: "Asie"
},




];

const container = document.getElementById("spiderList");

const groups = {
  "Samice": [],
  "Samec": [],
  "Neurčené": []
};

function getSpeciesDetail(spider) {
  if (!window.speciesData) return null;

  return window.speciesData.find(
    species => species.species === spider.name && species.slug
  ) || null;
}

function getSpiderUrl(spider) {
  const speciesDetail = getSpeciesDetail(spider);

  if (speciesDetail) {
    const returnTo = encodeURIComponent("index.html");

    return `species-detail.html?slug=${speciesDetail.slug}&returnTo=${returnTo}`;
  }

  return "coming-soon.html";
}

spiders.forEach(spider => {
  if (groups[spider.sex]) {
    groups[spider.sex].push(spider);
  }
});

Object.keys(groups).forEach(groupName => {
  if (groups[groupName].length > 0) {
    container.innerHTML += `
      <div class="offerGroup">
        <h3 class="offerGroupTitle">${groupName}</h3>
        <div class="offerGroupList">
          ${groups[groupName].map(spider => {
            let sexSymbol = "?";
            let sexClass = "unknown";

            if (spider.sex === "Samice") {
              sexSymbol = "♀";
              sexClass = "female";
            } else if (spider.sex === "Samec") {
              sexSymbol = "♂";
              sexClass = "male";
            }

            const speciesDetail = getSpeciesDetail(spider);
const spiderUrl = getSpiderUrl(spider);

const detailIcon = speciesDetail
  ? `<span class="speciesInfoBadge" title="Zobrazit informace o druhu">i</span>`
  : "";

return `
  <a href="${spiderUrl}" class="spider">
    <div class="name">
      <span class="sexIcon ${sexClass}">${sexSymbol}</span>
      <span>${spider.name}</span>
      ${detailIcon}
    </div>
    <div class="info">${spider.size}</div>
    <div class="price">${spider.price}</div>
  </a>
`;
          }).join("")}
        </div>
      </div>
    `;
  }
});