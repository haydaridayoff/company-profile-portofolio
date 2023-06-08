import { subscribeOnClickEvent, notifyOnClickEventWithData } from "./Utils/OnClickObserver.js";
    
export const arrCartItem = [];

export function onAddToCartInit(){
    subscribeOnClickEvent("onAddToCart", addToCart);
}

export function cartInit() {
    let arrCartObj = getCartPersistance();

    if (arrCartObj === null || arrCartObj === undefined) {
        return;
    }

    arrCartObj.forEach(cartItem => {
        arrCartItem.push(cartItem);
    });

    console.log("cartInit: arrCartItem.length = " + arrCartItem.length);
    addCartElementAll();
}

export function addToCart(merchObj) {
    if (merchObj == null || merchObj == undefined) {
        console.log("addToCart: merchObj is null or undefined");
        return null;
    }
    
    let cartItem = null;

    if (arrCartItem.length > 0) {
         cartItem = searchCartItem(merchObj);
         if (cartItem != null) {
            cartItem.quantity++;
         } else {
            cartItem = createCartItem(merchObj, 1)
            arrCartItem.push(cartItem);
         }
    } 
    else {
        cartItem = createCartItem(merchObj, 1)
        arrCartItem.push(cartItem);
    }
    
    console.log("addToCart: arrCartItem.length = " + arrCartItem.length);
    setCartPersistance(arrCartItem);
    notifyOnClickEventWithData("onAddToCartSuccess", arrCartItem);
    
    return arrCartItem;
}

function removeFromCart(merchObj, onSuccess = () => {}) {
    if (merchObj === null || merchObj === undefined) {
        console.log("removeFromCart: merchObj is null or undefined");
        return null;
    }

    if (arrCartItem.length < 0) {
        console.log("removeFromCart: arrCartItem is empty");
        return null;
    }

    let cartItem = arrCartItem.find(item => item.merchObj == merchObj);
    if (cartItem === null) {
        console.log("removeFromCart: cartItem is null");
        return null;
    }

    if (cartItem.quantity > 1) {
        console.log("removeFromCart: cartItem.quantity > 1");
        cartItem.quantity--;
    } else {
        console.log("removeFromCart: cartItem.quantity <= 1");
        arrCartItem.splice(arrCartItem.indexOf(cartItem), 1);
    }

    setCartPersistance(arrCartItem);
    onSuccess(arrCartItem);
    return arrCartItem;
}

function addEmptyCartElement() {
    let cartContainer = document.querySelector(".item");
    let cartElement = document.createElement("div");
    cartElement.className = "item__container cart-item flex justify-between items-center border-t-2";
    cartElement.innerHTML = `
    <div class="flex justify-between items-center">
        <div class="flex-shrink-0 h-48 w-48 bg-white overflow-hidden m-4">
            <img class="item__image h-full w-auto m-auto" src="Assets/TarotCards.png" alt="merchandise-image">
        </div>
        <div class="flex flex-col p-4">
            <h2 class="item__title min-h-6 max-h-16 font-bold text-lg overflow-hidden">Lorem Ipsum</h2>
            <p class="item__description min-h-12 max-h-24 overflow-y-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur tenetur iure incidunt beatae corporis fugit est nam qui, perspiciatis cumque ipsam vitae eos ullam! Voluptate aliquam cumque doloribus adipisci atque!
            Eveniet unde odio, voluptate, nostrum omnis voluptas consequuntur dolores culpa, suscipit veniam laboriosam similique libero aliquid qui inventore odit laudantium rem non beatae? Saepe omnis culpa voluptas autem dolorum asperiores.
            Nam reiciendis consequatur voluptatum tempore distinctio minus cupiditate quis magnam commodi vero, aliquid, nobis provident, cum natus repellat beatae? Architecto nemo minus placeat impedit reiciendis quia facilis deserunt in velit.
            Qui maxime harum doloremque ea! Blanditiis numquam odit, alias molestiae asperiores ducimus error inventore dolores earum vel itaque vero, laborum ex eius sapiente omnis magnam consectetur sint quos porro minus.
            Neque incidunt enim dolores ducimus necessitatibus.</p>
        </div>
    </div>
    <div class="flex flex-col h-48 min-w-[12rem] justify-between text-right p-4">
        <p class="item__price text-2xl font-bold before:content-['$']">20.00</p>
        <p class="text-base">Qty: <span class="item__quantity">1</span></p>
        <button class="item__remove-button text-right underline hover:text-violet-700">Remove From Cart</button>
    </div>
    `;
    cartContainer.appendChild(cartElement);
    return cartElement;
}
    
function addCartElementInfo(cartElement, cartItem) {
    if (cartItem === null || cartItem === undefined) {
        console.log("addCartElement: cartItem is null or undefined");
        return;
    }

    let cartRemoveBtn = cartElement.querySelector(".item__remove-button");
    let cartDescription = cartElement.querySelector(".item__description");
    let cartPrice = cartElement.querySelector(".item__price");
    let cartTitle = cartElement.querySelector(".item__title");
    let cartImage = cartElement.querySelector(".item__image");
    let cartQuantity = cartElement.querySelector(".item__quantity");

    cartTitle.textContent = cartItem.merchObj.title;
    cartDescription.textContent = cartItem.merchObj.description;
    cartPrice.textContent = cartItem.merchObj.price;
    cartImage.src = cartItem.merchObj.image;
    cartQuantity.textContent = cartItem.quantity;

    cartRemoveBtn.addEventListener("click", () => {
        if (cartItem.quantity <= 1) {
            cartElement.remove();
        }
        removeFromCart(cartItem.merchObj);
    });

    return cartElement;
}

function addCartElementAll() {
    let cartContainer = document.querySelector(".item__container");
    if (cartContainer === null) {
        console.log("addCartElementAll: cartContainer is null");
        return;
    }

    if (arrCartItem.length <= 0) {
        console.log("addCartElementAll: arrCartItem is empty");
        cartContainer.textContent = "Your cart is empty";
        return;
    }
    else {
        cartContainer.textContent = "";
        arrCartItem.forEach(cartItem => {
            let cartElement = addCartElementInfo(addEmptyCartElement(), cartItem);
        });
    }
}

function getCartPersistance() {
    let arrCartObj = localStorage.getItem("cart");
    if (arrCartObj === null) {
        console.log("getCartPersistance: arrCartItem is null");
        return null;
    }
    return JSON.parse(arrCartObj);
}

function setCartPersistance(arrCartItem) {
    localStorage.setItem("cart", JSON.stringify(arrCartItem));
}

function searchCartItem(merchObj) {
    if (merchObj === null || merchObj === undefined) {
        console.log("searchCartItem: merchObj is null or undefined");
        return;
    }

    let founditem = null;
    if (arrCartItem.length > 0) {
        arrCartItem.forEach(element => {
            if (element.merchObj.id === merchObj.id) {
                console.log("searchCartItem: cartItem found");
                founditem = element;
                return;
            }
        });
    }
    return founditem;
}

function createCartItem(merchObj, quantity) {
    if (merchObj === null || merchObj === undefined) {
        console.log("createCartItem: merchObj is null or undefined");
        return;
    }

    let cartItem = {
        merchObj: merchObj,
        quantity: quantity
    }
    return cartItem;
}

