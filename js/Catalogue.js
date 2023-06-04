const arrCatalogueElement = [];

function getAllCatalogueElement() {
    if (arrCatalogueElement.length > 0) {
        arrCatalogueElement.length = 0;
    }

    document.querySelectorAll(".merch").forEach(element => 
        {arrCatalogueElement.push(element);
    });
    return arrCatalogueElement;
}

function setAllCatalogueElementIndex() {
    if (arrCatalogueElement.length !== 0) {
        let index = 0;
        arrCatalogueElement.forEach(element => {
            element.setAttribute("data-index",index);
            index++;
        });
    }
}

function setCatalogueInfo(merchObj, index) {
    console.log(merchObj);
    arrCatalogueElement[index].querySelector(".merch__title").innerHTML = merchObj.title;
    arrCatalogueElement[index].querySelector(".merch__price").innerHTML = merchObj.price;
    arrCatalogueElement[index].querySelector(".merch__image").src = merchObj.image;
    arrCatalogueElement[index].querySelector(".merch__desc").innerHTML = merchObj.description;
}

function setCatalogueInfoAll(arrMerchObj) {
    let index = 0;
    console.log(arrMerchObj);
    arrCatalogueElement.forEach(element => {
        if (index >= arrMerchObj.length) {
            return;
        }
        setCatalogueInfo(arrMerchObj[index], index);
        index++;
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const arrMerchObj = await getAllMerchandise();
    console.log(arrMerchObj);
    getAllCatalogueElement();
    setAllCatalogueElementIndex();
    setCatalogueInfoAll(arrMerchObj);
});
