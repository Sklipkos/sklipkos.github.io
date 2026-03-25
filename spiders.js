const spiders = [
  {
    name: "Heteroscodra maculata",
    sex: "Samice",
    size: "3 cm",
    price: "700 Kč",
    slug: "heteroscodra-maculata",
    continent: "Afrika"
  },
  {
    name: "Pterinochilus murinus RCF",
    sex: "Samice",
    size: "adult",
    price: "1000 Kč",
    slug: "pterinochilus-murinus-rcf",
    continent: "Afrika"
  },
  {
    name: "Lasiodora parahybana",
    sex: "Samec",
    size: "4 cm",
    price: "300 Kč",
    slug: "lasiodora-parahybana",
    continent: "Amerika"
  },
  {
    name: "Psalmopoeus cambridgei",
    sex: "Neurčené",
    size: "1. svlek",
    price: "70 Kč",
    slug: "psalmopoeus-cambridgei",
    continent: "Amerika"
  }
];

const container = document.getElementById("spiderList");

const groups = {
  "Samice": [],
  "Samec": [],
  "Neurčené": []
};

function getSpiderUrl(spider) {
  if (spider.slug) {
    const returnTo = encodeURIComponent("index.html");
    return `species-detail.html?slug=${spider.slug}&returnTo=${returnTo}`;
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

            const spiderUrl = getSpiderUrl(spider);

            return `
              <a href="${spiderUrl}" class="spider">
                <div class="name">
                  <span class="sexIcon ${sexClass}">${sexSymbol}</span>
                  <span>${spider.name}</span>
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