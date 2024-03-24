let isProductPage =
  document.getElementsByClassName("main no-outline").length > 0;

let downloadModels = (URLs) => {
  return () => {
    for (let url of URLs) {
      window.open(url);
    }
  };
};

if (isProductPage) {
  let productId = document
    .querySelector(
      "#content > div > div > div > div.pip-product__subgrid.product-pip.js-product-pip"
    )
    .getAttribute("data-product-no");
  let buttonContainer = document.getElementById("pip-buy-module-content");
  fetch(
    `https://web-api.ikea.com/dimma/statics/${productId}?vars=show&market=es&loc=es`,
    {
      credentials: "omit",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:124.0) Gecko/20100101 Firefox/124.0",
        Accept: "application/json;version=2",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "x-consumer-id": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
      },
      referrer: "https://www.ikea.com/",
      method: "GET",
      mode: "cors",
    }
  )
    .then((data) => data.json())
    .then((data) => {
      if (!data.modelUrl) {
        return;
      }
      let button = document.createElement("a");
      button.innerHTML = "Download 3D model";
      button.style.cursor = "pointer";
      button.style.textDecoration = "underline";
      button.onclick = downloadModels([data.modelUrl]);
      buttonContainer.insertBefore(button, buttonContainer.childNodes[1]);
    });
}
