import {getAllMerchAsync, arrMerchObj, addArrMerchObjAll} from "./Merchandise.js";
import {addCatalogueElementInit, addCartNotifyInit} from "./Catalogue.js";
import {onAddToCartInit, cartInit, arrCartItem} from "./Cart.js";

document.addEventListener("DOMContentLoaded", async function () {
    onAddToCartInit()
    cartInit()
    console.log("arrCartItem = " + arrCartItem);
    let totalMerchQuantity = 0;
    arrCartItem.forEach(cartItem => {
        totalMerchQuantity += cartItem.quantity;
    });
    addCartNotifyInit(totalMerchQuantity);
    
    await getAllMerchAsync().then(res => {
        addArrMerchObjAll(res);}
    );
    
    addCatalogueElementInit(arrMerchObj);
});