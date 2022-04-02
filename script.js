const baseUrl = "http://makeup-api.herokuapp.com/api/v1/products.json";
const typesOfSearchParams = ['brand', 'product_type', 'product_tags']


async function fetchAllRawData(baseUrl){
    try{
        const response = await fetch(baseUrl, { method: 'GET', mode: "cors"});
        console.log("fetchAllRawData response: ");
        console.log(response.json());
        return response.json();
    }
    catch(error){
        console.log("fetchAllRawData error: ")
        console.log(error);
        return null;
    }
}

async function convertAllRawDataToCardArray(baseUrl){
    const response = await fetchAllRawData(baseUrl);
    if(response !== null){
        if(response.status === 200 && !response.redirected == true){
            let cardarrayDiv = document.createElement('div');
            cardarrayDiv.className = 'row';
    
            response.forEach(mkupItem => {        
                let cardDiv = document.createElement('div');
                cardDiv.className = 'cardDiv col-sm-12 col-md-6 col-lg-4';
                cardDiv.innerHTML = `
                <div class = "imageDiv">
                    <img src=${mkupItem.image_link} alt=${mkupItem.brand + " " + mkupItem.name} width="250" height="250">
                </div>
                <div class="detailsDiv">
                    <div class="brandDiv row">
                        <h6 class="col-4">Brand Name: </h6>
                        <h6 class="col-8">${mkupItem.brand}</h6>
                    </div>
                    <div class="itemDiv row">
                        <h6 class="col-4">Item Name: </h6>
                        <h6 class="col-8">${mkupItem.name}</h6>
                    </div>
                    <div class="colorCountDiv row">
                        <h6 class="col-4">Shades available: </h6>
                        <h6 class="col-8">${mkupItem.product_colors.length}</h6>
                    </div>
                    <div class="priceDiv row">
                        <h6 class="col-4">Price: </h6>
                        <h6 class="col-8">${mkupItem.price_sign}${mkupItem.price} (${mkupItem.currency})</h6>
                    </div>
                </div>
                `;
                cardarrayDiv.appendChild()













                /*
                let imageDiv = document.createElement('div');
                let imgElem = document.createElement('img');
                imgElem.src = mkupItem.image_link;
                imgElem.alt = mkupItem.brand + " " + mkupItem.name;
                imgElem.width = 250;
                imgElem.height = 250;
                imageDiv.appendChild(imgElem);
    
                let brandDiv = document.createElement('div');
                let brandTxt = document.createElement('h6');
                brandTxt.innerHTML = mkupItem.brand;
                brandDiv.appendChild(brandTxt);
    
                let productnameDiv = document.createElement('div');
                let productnameTxt = document.createElement('h6');
                productnameTxt.innerHTML = mkupItem.name;
                productnameDiv.appendChild(productnameTxt);
    
                let colorsDiv = document.createElement('div');
                let colorsCount = document.createElement('h3');
                colorsCount.innerHTML = mkupItem.product_colors.length;
                colorsDiv.appendChild(colorsCount);
    
                let priceDiv = document.createElement('div');
                let priceValue = document.createElement('h3');
                priceValue.innerHTML = `${mkupItem.price_sign}${mkupItem.price} (${mkupItem.currency})`;
                priceDiv.appendChild(priceValue);
    
                let detailsDiv = document.createElement('div'); 
                detailsDiv.appendChild(brandDiv);
                detailsDiv.appendChild(productnameDiv);
                detailsDiv.appendChild(colorsDiv);
                detailsDiv.appendChild(priceDiv);
    
                let cardDiv = document.createElement('div');
                cardDiv.appendChild(imageDiv);
                cardDiv.appendChild(detailsDiv);
                cardDiv.className = "col-sm-12 col-md-6 col-lg-4";
                
                cardarrayDiv.appendChild(cardDiv);
                */
            });
    
            return cardarrayDiv;
        }
        else{
            console.log("convertAllRawDataToCardArray - something not ok")
            return null;
        }
    }
    else{
        console.log("response is null");
    }
    
    
}

//convertAllRawDataToCardArray(baseUrl);

/*
async function displayHomePage(baseUrl){
    let containerDiv = document.createElement('div');
    containerDiv.className = 'container';
    containerDiv.id = 'displayRoot';

    search_dataList = document.createElement('datalist');
    const response = await fetchAllRawData(baseUrl);
    if(response.status === 200 && !response.redirected == true){
        
    }
    else{
        console.log("populating datalist failed - 1646520269")
    }

    let searchcolDiv = document.createElement('div');
    searchcolDiv.className = 'col';





    let searchrowDiv = document.createElement('div');
    searchrowDiv.className = 'row'
}
*/


async function getSearchResultsByParameter(searchParameter, searchString){
    let requestUrl = baseUrl;
    switch (searchParameter){
        case typesOfSearchParams[0]:
            requestUrl += ('?' + typesOfSearchParams[0] + '=' + searchString);
            break;
        case typesOfSearchParams[1]:
            requestUrl += ('?' + typesOfSearchParams[1] + '=' + searchString);
            break;
        case typesOfSearchParams[2]:
            requestUrl += ('?' + typesOfSearchParams[2] + '=' + searchString);
            break;
        default:
            requestUrl += ('?' + typesOfSearchParams[0] + '=' + searchString);
            break;
    }
    try{
        console.log(requestUrl);
        const response = await fetch(requestUrl, { method: 'GET', mode: "cors"});
        console.log(response);
        let respJson = await response.json();
        console.log(respJson);
        return respJson;
    }
    catch(error){
        console.log("error: " + error);
        return null;
    }
}

function displayResults(responseJson){
    let resultDisplayDiv = document.createElement('div');
    resultDisplayDiv.className = 'row';
    resultDisplayDiv.id = 'displayArea'
    console.log(responseJson.length);
    responseJson.forEach(mkupItem => {        
        let cardDiv = document.createElement('div');
        cardDiv.className = 'cardDiv col-sm-12 col-md-6 col-lg-4';
        cardDiv.innerHTML = 
            `<div class = "imageDiv">
                <img src=${mkupItem.image_link} alt=${mkupItem.brand + " " + mkupItem.name} width="250" height="250">
            </div>
            <div class="detailsDiv">
                <div class="brandDiv row">
                    <h6 class="col-4">Brand Name: </h6>
                    <h6 class="col-8">${mkupItem.brand}</h6>
                </div>
                <div class="itemDiv row">
                    <h6 class="col-4">Item Name: </h6>
                    <h6 class="col-8">${mkupItem.name}</h6>
                </div>
                <div class="colorCountDiv row">
                    <h6 class="col-4">Shades available: </h6>
                    <h6 class="col-8">${mkupItem.product_colors.length}</h6>
                </div>
                <div class="priceDiv row">
                    <h6 class="col-4">Price: </h6>
                    <h6 class="col-8">${mkupItem.price_sign}${mkupItem.price} (${mkupItem.currency})</h6>
                </div>
            </div>`;
            console.log(cardDiv);
        resultDisplayDiv.appendChild(cardDiv);
    });
    document.getElementById('displayResultsDiv').append(resultDisplayDiv);
}

const displayResultsJson = getSearchResultsByParameter(typesOfSearchParams[0], "maybelline");
console.log(displayResultsJson);
displayResults(displayResultsJson);