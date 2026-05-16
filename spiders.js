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
    price: "800 Kč",
    slug: "pterinochilus-murinus-rcf",
    continent: "Afrika"
  },
  {
    name: "Poecilotheria ornata",
    sex: "Samice",
    size: "adult",
    price: "1900 Kč",

    continent: "Asie"
  },
  {
    name: "Poecilotheria regalis",
    sex: "Samice",
    size: "5 cm",
    price: "1700 Kč",
    
    continent: "Asie"
  },
  {
    name: "Cyriopagopus sp. Hati Hati",
    sex: "Samice",
    size: "sub-adult",
    price: "1800 Kč",
    
    continent: "Asie"
  },
  {
    name: "Aspinochilus (ex. Phormingochilus) rufus",
    sex: "Samice",
    size: "sub-adult",
    price: "700 Kč",
    
    continent: "Asie"
  },
  {
    name: "Psalmopoeus cambridgei",
    sex: "Neurčené",
    size: "1. svlek",
    price: "70 Kč",
    slug: "psalmopoeus-cambridgei",
    continent: "Amerika"
  },
  {
    name: "Chilobrachys natanicharum",
    sex: "Samec",
    size: "adult",
    price: "400 Kč",

    continent: "Asie"
  },

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