const merchUrl = "https://fakestoreapi.com/products";
export const arrMerchObj = [];
export const getAllMerchAsync = getAllMerchandise;

function getServerResponse(response){
    return response.json();
}

export function saveAllMerchandise(merchObj){
    localStorage.setItem("merchandise",merchObj);
}

async function getAllMerchandise(){
    let response = await fetch(merchUrl);
    let merchObj = await getServerResponse(response);

    return merchObj;
}

export function addArrMerchObjAll(newArrMerchObj) {
    if (newArrMerchObj == null || newArrMerchObj == undefined || newArrMerchObj.length <= 0)
    {
        return;
    } 
    else if (arrMerchObj.length > 0){
        arrMerchObj.length = 0;
    }

    newArrMerchObj.forEach(merchObj => {
        arrMerchObj.push(merchObj);
    });
}