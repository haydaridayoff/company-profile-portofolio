const merchUrl = "https://fakestoreapi.com/products";
let merch = [];


function main(){
    getMerchandise();
}

function getServerResponse(response){
    return response.json();
}

function consoleOutput(input){
    console.log(input);
}

function saveMerchandise(json){
    let merchObj = JSON.stringify(json);
    localStorage.setItem("merchandise",merchObj);
    merch = merchObj;
}

async function getMerchandise(){
    let response = await fetch(merchUrl);
    let json = await getServerResponse(response);

    consoleOutput(json);
    saveMerchandise(json);
}

document.addEventListener("DOMContentLoaded",main);