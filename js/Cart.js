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
    updateTotalPrice();
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
    updateTotalPrice();

    notifyOnClickEventWithData("onAddToCartSuccess", arrCartItem, cartItem);
    
    return arrCartItem;
}

function removeFromCart(merchObj) {
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

    cartItem.quantity--;
    if (cartItem.quantity <= 0) {
        console.log("removeFromCart: cartItem.quantity <= 0");
        arrCartItem.splice(arrCartItem.indexOf(cartItem), 1);
    }

    setCartPersistance(arrCartItem);
    updateTotalPrice();

    return arrCartItem;
}

function updateTotalPrice() {
    let priceElement = document.querySelector(".total__price");
    if (priceElement === null || priceElement === undefined) {
        console.log("updateTotalPrice: priceElement is null or undefined");
        return;
    }

    let total = 0;
    arrCartItem.forEach(item => {
        total += item.merchObj.price * item.quantity;
    });
    priceElement.textContent = total;
    return total.toFixed(2);
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
    cartPrice.textContent = (cartItem.merchObj.price * cartItem.quantity).toFixed(2);
    cartImage.src = cartItem.merchObj.image;
    cartQuantity.textContent = cartItem.quantity;

    cartRemoveBtn.addEventListener("click", () => {
        removeFromCart(cartItem.merchObj);
        updateCartItemInfo(cartItem, cartElement);
    });

    return cartElement;
}

function updateCartItemInfo(cartItem, cartElement) {
    if (arrCartItem === null || arrCartItem === undefined) {
        console.log("updateCartItemInfo: arrCartItem is null or undefined");
        return;
    }

    if (cartItem === null || cartItem === undefined) {
        console.log("updateCartItemInfo: cartItem is null or undefined");
        return;
    }
    
    if (cartElement === null || cartElement === undefined) {
        console.log("updateCartItemInfo: cartElement is null or undefined");
        return;
    }

    console.log(cartItem);
    if (cartItem.quantity <= 0) {
        removeCartElement(cartElement);
    }
    else {
        let cartPrice = cartElement.querySelector(".item__price");
        let cartQuantity = cartElement.querySelector(".item__quantity");

        cartPrice.textContent = cartItem.merchObj.price * cartItem.quantity;
        cartQuantity.textContent = cartItem.quantity;
    }
}

function removeCartElement(cartElement) {
    if (cartElement === null || cartElement === undefined) {
        console.log("removeCartElement: cartElement is null or undefined");
        return;
    }

    cartElement.remove();
    if (arrCartItem.length <= 0) {
        let cartContainer = document.querySelector(".item__container");
        cartContainer.textContent = "Your cart is empty";
    }
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

