import {getAllMerchAsync, arrMerchObj, addArrMerchObjAll} from "./Merchandise.js";
import {addCatalogueElementInit, addCartNotifyInit} from "./Catalogue.js";
import {onAddToCartInit, cartInit, arrCartItem} from "./Cart.js";

document.addEventListener("DOMContentLoaded", async function () {
    onAddToCartInit()
    cartInit()

    addCartNotifyInit(arrCartItem.length);
    
    await getAllMerchAsync().then(res => {
        addArrMerchObjAll(res);}
    );

    addCatalogueElementInit(arrMerchObj);
});