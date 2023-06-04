const merchUrl = "https://fakestoreapi.com/products";
const getAllMerchAsync = getAllMerchandise;
const arrMerchObj = [];

function getServerResponse(response){
    return response.json();
}

function saveAllMerchandise(merchObj){
    localStorage.setItem("merchandise",merchObj);
}

async function getAllMerchandise(){
    let response = await fetch(merchUrl);
    let merchObj = await getServerResponse(response);

    return merchObj;
}