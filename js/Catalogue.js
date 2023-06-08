import { arrMerchObj } from "./Merchandise.js";
import { notifyOnClickEventWithData, subscribeOnClickEvent } from "./Utils/OnClickObserver.js";
import { NumberNotify } from "./Utils/NumberNotify.js";

export const arrCatalogueElement = [];
let cartNotify;

export function addCatalogueElementInit(arrMerchItem) {
    let catalogueElement = null;
    arrMerchItem.forEach(merchItem => {
        catalogueElement = addEmptyCatalogueElement();
        setCatalogueInfo(merchItem, catalogueElement.getAttribute("data-index"));
    });
}

export function addCartNotifyInit(number) {
    let cartParentElement = document.getElementById("notif");
    cartNotify = new NumberNotify();
    cartNotify.createElement(cartParentElement);
    console.log("addCartNotifyInit: number = " + number);
    cartNotify.setElementNumber(number);

    subscribeOnClickEvent("onAddToCartSuccess", updateNotify);
}

function updateNotify(arrMerchItem) {
    let number = 0;
    arrMerchItem.forEach(merchItem => {
        number += merchItem.quantity;
    });
    cartNotify.setElementNumber(number);
}

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

function setCatalogueInfo(merchItem, index) {
    arrCatalogueElement[index].querySelector(".merch__title").innerHTML = merchItem.title;
    arrCatalogueElement[index].querySelector(".merch__price").innerHTML = merchItem.price;
    arrCatalogueElement[index].querySelector(".merch__image").src = merchItem.image;
    arrCatalogueElement[index].querySelector(".merch__desc").innerHTML = merchItem.description;
}

function setCatalogueInfoAll(arrMerchItem) {
    let index = 0;
    arrCatalogueElement.forEach(element => {
        if (index >= arrMerchItem.length) {
            return;
        }
        setCatalogueInfo(arrMerchItem[index], index);
        index++;
    });
}

function getCatalogueContainer() {
    return document.getElementById("catalogue");
}

/// <summary>
/// Adds an empty catalogue element to the catalogue container.
/// arrCatalogueElement is updated.
/// data-index is set to the index of the element in arrCatalogueElement.
/// </summary>
/// <returns>The catalogue element that was added.</returns>
function addEmptyCatalogueElement() {
    let catalogueContainer = getCatalogueContainer();
    let catalogueElement = document.createElement("div");
    catalogueElement.className = "merch bg-violet-800 p-3 shadow-lg flex flex-col";
    catalogueElement.innerHTML = `
    <div class="w-full h-80 bg-white overflow-hidden flex justify-center">
        <img class="merch__image h-full w-auto" src="Assets/TarotCards.png" alt="merchandise-image" data-status="">
    </div>
    <div class="overflow-hidden flex flex-col h-40">
        <h2 class="merch__title min-h-6 max-h-16 font-bold text-lg overflow-hidden">Lorem Ipsum</h2>
        <p class="merch__desc min-h-12 max-h-24 overflow-y-auto">A deck of 78 cards that can be used for divination,
            self-reflection, and meditation.</p>
    </div>
    <p class="merch__price before:content-['$'] text-2xl font-bold p-2 self-center">20.00</p>
    <button class="merch__addBtn bg-violet-500 p-1 rounded-md overflow-hidden">Add to Cart</button>
    `;
    let catalogueElementButton = catalogueElement.querySelector(".merch__addBtn");

    catalogueElementButton.addEventListener("click", onAddToCartClick);

    catalogueContainer.appendChild(catalogueElement);
    arrCatalogueElement.push(catalogueElement);
    catalogueElement.setAttribute("data-index",arrCatalogueElement.length-1);
    return catalogueElement;
}

function onAddToCartClick(event) {
    let catalogueElement = event.target.parentElement;
    let index = catalogueElement.getAttribute("data-index");
    let merchItem = arrMerchObj[index];

    console.log("onAddToCartClick: arrMerchObj = " + arrMerchObj);
    notifyOnClickEventWithData('onAddToCart', merchItem, arrMerchObj);
}
