let isProductPage = document.getElementsByClassName('main no-outline').length > 0;

let downloadModels = (models) => {
    return () => {
        for (let model of models) {
            window.open(model.url);
        }
    }
}

if (isProductPage) {
    let productId = document.querySelector("#content > div > div > div > div.pip-product__subgrid.product-pip.js-product-pip").getAttribute('data-product-no');
    let buttonContainer = document.getElementById("pip-buy-module-content");

    fetch(`https://www.ikea.com/global/assets/rotera/resources/${productId}.json`)
        .then((data) => data.json())
        .then((data) => {
            let button = document.createElement('a');
            button.innerHTML = 'Download 3D model';
            button.style.cursor = 'pointer';
            button.style.textDecoration = 'underline';
            if (data.models.length > 0) {
                button.onclick = downloadModels(data.models);
                buttonContainer.insertBefore(button, buttonContainer.childNodes[1]);
            }
        });
}
