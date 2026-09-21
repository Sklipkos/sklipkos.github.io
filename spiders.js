const spiders = [


{
    name: "Dolichothele diamantinensis",
    sex: "Samec",
    size: "adult",
    price: "900 Kč",
    continent: "Amerika"
},

{
    name: "Lasiocyano (ex. Pterinopelma) sazimai",
    sex: "Samec",
    size: "adult",
    price: "500 Kč",
    continent: "Amerika"
},

{
    name: "Pamphobeteus sp. Machala",
    sex: "Samec",
    size: "adult",
    price: "600 Kč",
    continent: "Amerika"
},

{
    name: "Psalmopoeus cambridgei",
    sex: "Samec",
    size: "adult",
    price: "400 Kč",
    continent: "Amerika"
},

{
    name: "Psalmopoeus pulcher",
    sex: "Samec",
    size: "adult",
    price: "700 Kč",
    continent: "Amerika"
},

{
    name: "Psalmopoeus pulcher",
    sex: "Samec",
    size: "3,5cm",
    price: "400 Kč",
    continent: "Amerika"
},

{
    name: "Psalmopoeus reduncus",
    sex: "Samec",
    size: "sub-adult",
    price: "300 Kč",
    continent: "Amerika"
},







{
    name: "Aspinochilus (ex. Phormingochilus) rufus",
    sex: "Neurčené",
    size: "2. slvek",
    price: "80 Kč/kus",
    continent: "Asie"
},

{
    name: "Heteroscodra maculata",
    sex: "Neurčené",
    size: "1. slvek",
    price: "70 Kč/kus",
    continent: "Afrika"
},

{
    name: "Chilobrachys sp. Vietnam Blue",
    sex: "Neurčené",
    size: "3.svlek",
    price: "80 Kč/kus",
    continent: "Asie"
},

{
    name: "Ornithoctonus aureotibialis",
    sex: "Neurčené",
    size: "4.svlek",
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